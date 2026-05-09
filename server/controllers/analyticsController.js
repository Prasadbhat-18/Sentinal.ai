import ActivityLog from '../models/ActivityLog.js';
import { calculateOverallRisk } from '../utils/riskScorer.js';

// @desc    Get top 10 visited sites
// @route   GET /api/analytics/top-sites
// @access  Private
export const getTopSites = async (req, res) => {
  try {
    const topSites = await ActivityLog.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$domain', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    res.json(topSites.map(site => ({ domain: site._id, count: site.count })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get activity heatmap by hour
// @route   GET /api/analytics/hourly-heatmap
// @access  Private
export const getHourlyHeatmap = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ userId: req.user._id }).select('visitedAt');
    
    const hourlyDistribution = new Array(24).fill(0);
    
    logs.forEach(log => {
      if (log.visitedAt) {
        const hour = new Date(log.visitedAt).getHours();
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
    const categories = await ActivityLog.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json(categories.map(cat => ({ category: cat._id, count: cat.count })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get privacy risk score and radar data
// @route   GET /api/analytics/risk-score
// @access  Private
export const getRiskScore = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ userId: req.user._id });
    
    if (logs.length === 0) {
      return res.json({ score: 0, radar: [] });
    }

    const overallScore = calculateOverallRisk(logs);
    
    // Calculate simple radar axes based on logic from PRD
    const totalVisits = logs.length;
    
    const socialVisits = logs.filter(l => l.category === 'social').length;
    const shoppingVisits = logs.filter(l => l.category === 'shopping').length;
    const prodVisits = logs.filter(l => l.category === 'productivity').length;
    
    const nocturnalVisits = logs.filter(l => {
      const h = new Date(l.visitedAt).getHours();
      return h >= 0 && h < 5;
    }).length;

    const privacyVisits = logs.filter(l => l.domain.includes('duckduckgo') || l.domain.includes('proton')).length;

    const radar = [
      { axis: "Social Dependency", value: Math.min((socialVisits / totalVisits) * 200, 100) },
      { axis: "Impulsivity", value: Math.min((shoppingVisits / totalVisits) * 200, 100) },
      { axis: "Productivity", value: Math.min((prodVisits / totalVisits) * 200, 100) },
      { axis: "Nocturnal Index", value: Math.min((nocturnalVisits / totalVisits) * 300, 100) },
      { axis: "Privacy Awareness", value: privacyVisits > 0 ? 80 : 20 },
      { axis: "Attention Span", value: 50 } // Mocked as we don't have exact duration data reliably yet
    ];

    res.json({ score: overallScore, radar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
