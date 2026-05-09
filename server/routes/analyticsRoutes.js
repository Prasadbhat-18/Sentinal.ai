import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getTopSites, 
  getHourlyHeatmap, 
  getCategoryBreakdown,
  getRiskScore 
} from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/top-sites', protect, getTopSites);
router.get('/hourly-heatmap', protect, getHourlyHeatmap);
router.get('/category-breakdown', protect, getCategoryBreakdown);
router.get('/risk-score', protect, getRiskScore);

export default router;
