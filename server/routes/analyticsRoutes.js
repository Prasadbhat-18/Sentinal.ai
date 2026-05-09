import express from 'express';
import { 
  getTopSites, 
  getHourlyHeatmap, 
  getCategoryBreakdown,
  getRiskScore 
} from '../controllers/analyticsController.js';

const router = express.Router();

const mockAuth = (req, res, next) => {
  req.user = { _id: 'mock-user-123' };
  next();
};

router.get('/top-sites', mockAuth, getTopSites);
router.get('/hourly-heatmap', mockAuth, getHourlyHeatmap);
router.get('/category-breakdown', mockAuth, getCategoryBreakdown);
router.get('/risk-score', mockAuth, getRiskScore);

export default router;
