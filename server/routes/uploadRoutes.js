import express from 'express';
import multer from 'multer';
import { uploadChromeHistory } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Setup multer for temporary file storage
const upload = multer({ dest: 'uploads/' });

router.post('/chrome-history', protect, upload.single('historyFile'), uploadChromeHistory);

export default router;
