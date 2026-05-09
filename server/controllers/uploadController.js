import fs from 'fs';
import ActivityLog from '../models/ActivityLog.js';
import { categorizeDomain } from '../utils/categoryMapper.js';
import { calculateRiskLevel } from '../utils/riskScorer.js';
import * as dataStore from '../utils/dataStore.js';
import mongoose from 'mongoose';

// Helper to extract domain from URL
const extractDomain = (url) => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '');
  } catch (err) {
    return url; // fallback
  }
};

// @desc    Upload Chrome History JSON
// @route   POST /api/upload/chrome-history
// @access  Private
export const uploadChromeHistory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileContent = fs.readFileSync(req.file.path, 'utf8');
    const historyData = JSON.parse(fileContent);

    // Chrome History JSON format: array of { url, title, time_usec }
    // Or sometimes { "Browser History": [ ... ] } from Takeout
    const entries = Array.isArray(historyData) ? historyData : (historyData['Browser History'] || []);

    if (entries.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty history file' });
    }

    // Process and insert logs
    const logsToInsert = [];
    
    // Process max 5000 items to avoid overwhelming DB for demo
    const processLimit = Math.min(entries.length, 5000);

    for (let i = 0; i < processLimit; i++) {
      const item = entries[i];
      if (!item.url) continue;

      const domain = extractDomain(item.url);
      const category = categorizeDomain(domain);
      const riskLevel = calculateRiskLevel(domain, category);
      
      // Parse time (usec to ms if needed)
      let visitedAt = new Date();
      if (item.time_usec) {
        visitedAt = new Date(item.time_usec / 1000);
      } else if (item.time_sec) {
        visitedAt = new Date(item.time_sec * 1000);
      }

      logsToInsert.push({
        userId: req.user._id,
        domain,
        url: item.url,
        title: item.title || domain,
        category,
        visitedAt,
        riskLevel,
        duration: 0 // Will need heuristic to calculate
      });
    }

    // Clear existing logs for user
    const isDbConnected = mongoose.connection.readyState === 1;
    
    if (isDbConnected) {
      await ActivityLog.deleteMany({ userId: req.user._id });
      if (logsToInsert.length > 0) {
        await ActivityLog.insertMany(logsToInsert);
      }
    } else {
      dataStore.clearLogs(req.user._id);
      dataStore.addLogs(logsToInsert);
      console.log('Data stored in-memory (DB disconnected)');
    }

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({ 
      message: 'History uploaded and processed successfully',
      count: logsToInsert.length
    });
  } catch (error) {
    console.error(error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Error processing file: ' + error.message });
  }
};
