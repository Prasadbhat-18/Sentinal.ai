import fs from 'fs';
import { calculateOverallRisk } from '../utils/riskScorer.js';

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
    const logs = getMockDB();
    const domainCounts = {};
    logs.forEach(l => { domainCounts[l.domain] = (domainCounts[l.domain] || 0) + 1; });
    const topSites = Object.entries(domainCounts)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
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
    const logs = getMockDB();
    
    const hourlyDistribution = new Array(24).fill(0);
    
    logs.forEach(log => {
      if (log.visitedAt || log.scannedAt) {
        const hour = new Date(log.visitedAt || log.scannedAt).getHours();
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
    const logs = getMockDB();
    const catCounts = {};
    logs.forEach(l => { catCounts[l.category] = (catCounts[l.category] || 0) + 1; });
    const categories = Object.entries(catCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
    
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
    const logs = getMockDB();
    
    if (logs.length === 0) {
      return res.json({ score: 0, radar: [], domain: '' });
    }

    // Calculate risk from the scanned data
    const totalVisits = logs.length;
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
    const isDev = ['github','gitlab','stackoverflow','npmjs','codepen','replit','vercel','netlify'].some(t => latestDomain.includes(t));
    const isNews = ['nytimes','cnn','bbc','reuters','news','theverge','techcrunch','medium'].some(t => latestDomain.includes(t));
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
