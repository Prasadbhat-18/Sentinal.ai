import express from 'express';
import multer from 'multer';
import { uploadChromeHistory } from '../controllers/uploadController.js';
import { scanUrl } from '../controllers/scanController.js';

const router = express.Router();

const mockAuth = (req, res, next) => {
  req.user = { _id: 'mock-user-123' };
  next();
};

const upload = multer({ dest: 'uploads/' });

router.post('/chrome-history', mockAuth, upload.single('historyFile'), uploadChromeHistory);
router.post('/scan', mockAuth, scanUrl);

export default router;
