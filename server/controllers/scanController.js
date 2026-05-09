import fs from 'fs';
import { categorizeDomain } from '../utils/categoryMapper.js';
import { calculateRiskLevel } from '../utils/riskScorer.js';

export const scanUrl = (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'URL required' });
    
    let domain = url;
    try {
        domain = new URL(url).hostname.replace(/^www\./, '');
    } catch(e) {
        return res.status(400).json({ message: 'Invalid URL format' });
    }

    // Use real category mapper
    const category = categorizeDomain(domain);
    const riskLevel = calculateRiskLevel(domain, category);

    // Calculate numeric risk score based on real heuristics
    let riskScore = 35; // base
    
    // High-tracker domains
    const highTrackerDomains = ['facebook.com','instagram.com','tiktok.com','google.com','youtube.com',
        'twitter.com','x.com','amazon.com','doubleclick.net','google-analytics.com'];
    if (highTrackerDomains.some(d => domain.includes(d))) riskScore += 30;

    // Social media bump
    if (category === 'social') riskScore += 15;
    // Shopping bump
    if (category === 'shopping') riskScore += 10;
    // Tracker-heavy sites
    if (riskLevel === 'High') riskScore += 10;
    if (riskLevel === 'Medium') riskScore += 5;

    // Privacy-conscious sites get bonus
    if (['duckduckgo.com','protonmail.com','signal.org'].some(d => domain.includes(d))) riskScore = Math.max(riskScore - 20, 10);

    // Add some randomness for realism
    riskScore = Math.min(Math.max(riskScore + Math.floor(Math.random()*10 - 5), 10), 95);

    // Detect trackers (simulated but realistic per domain)
    const trackers = [];
    if (highTrackerDomains.some(d => domain.includes(d))) {
        trackers.push('Google Analytics', 'Facebook Pixel', 'DoubleClick');
    }
    if (category === 'social') trackers.push('Social Graph API', 'Behavioral Profiler');
    if (category === 'shopping') trackers.push('Retargeting Pixel', 'Purchase Intent Tracker');
    if (category === 'video') trackers.push('Watch History Logger', 'Recommendation Engine');
    if (trackers.length === 0) trackers.push('Standard Cookies');

    const data = {
        url,
        domain,
        category,
        riskLevel,
        riskScore,
        trackers,
        visitedAt: new Date().toISOString(),
        scannedAt: new Date().toISOString()
    };
    
    // Read existing DB and append
    let existingData = [];
    try {
        if (fs.existsSync('./mockDB.json')) {
            existingData = JSON.parse(fs.readFileSync('./mockDB.json', 'utf8'));
        }
    } catch(e) {}

    // Keep last 50 scans
    existingData.unshift(data);
    if (existingData.length > 50) existingData = existingData.slice(0, 50);
    
    fs.writeFileSync('./mockDB.json', JSON.stringify(existingData, null, 2));
    
    res.status(200).json(data);
};
