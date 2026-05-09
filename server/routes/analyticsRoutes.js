import express from 'express';
import { 
  getTopSites, 
  getHourlyHeatmap, 
  getCategoryBreakdown,
  getRiskScore,
  scanUrl
} from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/top-sites', protect, getTopSites);
router.get('/hourly-heatmap', protect, getHourlyHeatmap);
router.get('/category-breakdown', protect, getCategoryBreakdown);
router.get('/risk-score', protect, getRiskScore);
router.post('/scan-url', protect, scanUrl);

export default router;
