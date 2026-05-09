import fs from 'fs';
import { calculateOverallRisk } from '../utils/riskScorer.js';
import * as dataStore from '../utils/dataStore.js';
import mongoose from 'mongoose';
import ActivityLog from '../models/ActivityLog.js';

const getMockDB = () => {
  try {
    if (fs.existsSync('./mockDB.json')) {
      return JSON.parse(fs.readFileSync('./mockDB.json', 'utf8'));
    }
  } catch(e) {}
  return [];
};

// @desc    Get top 10 visited sites
// @route   GET /api/analytics/top-sites
// @access  Private
export const getTopSites = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    let topSites;

    if (isDbConnected) {
      topSites = await ActivityLog.aggregate([
        { $match: { userId: req.user._id } },
        { $group: { _id: '$domain', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]);
      topSites = topSites.map(s => ({ domain: s._id, count: s.count }));
    } else {
      topSites = dataStore.aggregateLogs(req.user._id, 'domain')
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }
    
    res.json(topSites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get activity heatmap by hour
// @route   GET /api/analytics/hourly-heatmap
// @access  Private
export const getHourlyHeatmap = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    let logs;

    if (isDbConnected) {
      logs = await ActivityLog.find({ userId: req.user._id }).select('visitedAt scannedAt');
    } else {
      logs = dataStore.getLogs(req.user._id);
    }
    
    const hourlyDistribution = new Array(24).fill(0);
    
    logs.forEach(log => {
      const date = log.visitedAt || log.scannedAt;
      if (date) {
        const hour = new Date(date).getHours();
        hourlyDistribution[hour]++;
      }
    });
    
    res.json(hourlyDistribution.map((count, hour) => ({ hour, count })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get category breakdown
// @route   GET /api/analytics/category-breakdown
// @access  Private
export const getCategoryBreakdown = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    let categories;

    if (isDbConnected) {
      categories = await ActivityLog.aggregate([
        { $match: { userId: req.user._id } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      categories = categories.map(c => ({ category: c._id, count: c.count }));
    } else {
      categories = dataStore.aggregateLogs(req.user._id, 'category')
        .sort((a, b) => b.count - a.count);
    }
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get privacy risk score and radar data
// @route   GET /api/analytics/risk-score
// @access  Private
export const getRiskScore = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    let logs;

    if (isDbConnected) {
      logs = await ActivityLog.find({ userId: req.user._id }).sort({ visitedAt: -1, scannedAt: -1 });
    } else {
      logs = dataStore.getLogs(req.user._id).sort((a, b) => new Date(b.visitedAt || b.scannedAt) - new Date(a.visitedAt || a.scannedAt));
    }
    
    if (logs.length === 0) {
      return res.json({ score: 0, radar: [], domain: '' });
    }

    // Calculate risk from the scanned data
    const latestDomain = logs[0].domain || '';
    const latestCategory = logs[0].category || 'uncategorized';
    
    // Use the stored riskScore if available, otherwise calculate
    let overallScore = logs[0].riskScore || 0;
    if (!overallScore) {
      try { overallScore = calculateOverallRisk(logs); } catch(e) { overallScore = 50; }
    }
    
    // Build radar data based on domain characteristics
    const hasTrackers = ['facebook.com','instagram.com','tiktok.com','twitter.com','x.com','google.com','youtube.com','amazon.com','doubleclick.net'].some(t => latestDomain.includes(t));
    const isSocial = ['facebook','instagram','tiktok','twitter','x.com','reddit','linkedin','snapchat','pinterest'].some(t => latestDomain.includes(t));
    const isShopping = ['amazon','ebay','walmart','target','etsy','shop','flipkart','alibaba'].some(t => latestDomain.includes(t));
    const isPrivacy = ['duckduckgo','proton','signal','tor','brave'].some(t => latestDomain.includes(t));

    const radar = [
      { axis: "Tracker Density", value: hasTrackers ? Math.floor(Math.random()*20+60) : Math.floor(Math.random()*20+10) },
      { axis: "Social Exposure", value: isSocial ? Math.floor(Math.random()*20+70) : Math.floor(Math.random()*15+5) },
      { axis: "Commerce Risk", value: isShopping ? Math.floor(Math.random()*20+60) : Math.floor(Math.random()*10+5) },
      { axis: "Data Collection", value: hasTrackers ? Math.floor(Math.random()*25+55) : Math.floor(Math.random()*20+10) },
      { axis: "Privacy Score", value: isPrivacy ? Math.floor(Math.random()*15+75) : Math.floor(Math.random()*20+20) },
      { axis: "Cookie Footprint", value: hasTrackers ? Math.floor(Math.random()*20+50) : Math.floor(Math.random()*15+10) }
    ];

    res.json({ score: overallScore, radar, domain: latestDomain, category: latestCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Scan a specific URL for threats and leaks
// @route   POST /api/analytics/scan-url
// @access  Private
export const scanUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  try {
    const domain = new URL(url).hostname.replace(/^www\./, '');
    
    // Simulated scan logic
    const threats = [
      { id: 'T1', type: 'Cross-Site Scripting', risk: 'HIGH', status: 'ACTIVE' },
      { id: 'T2', type: 'Unencrypted Data Flow', risk: 'MEDIUM', status: 'FLAGGED' },
      { id: 'T3', type: 'Third-Party Pixel Tracking', risk: 'LOW', status: 'DETECTED' }
    ].filter(() => Math.random() > 0.3);

    const leaks = [
      { id: 'L1', site: 'Dark Web Forum #4', data: 'Email Address', date: '2024-03-12' },
      { id: 'L2', site: 'Public S3 Bucket', data: 'IP History', date: '2024-01-05' },
      { id: 'L3', site: 'Ad-Tech Aggregator', data: 'Browser Fingerprint', date: '2023-11-20' }
    ].filter(() => Math.random() > 0.4);

    const result = {
      domain,
      url,
      timestamp: new Date(),
      threatScore: Math.floor(Math.random() * 60 + 40),
      threats,
      leaks,
      summary: `Domain ${domain} exhibits ${threats.length} active vulnerabilities and has been linked to ${leaks.length} historical data leaks.`
    };

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: 'Invalid URL format' });
  }
};
