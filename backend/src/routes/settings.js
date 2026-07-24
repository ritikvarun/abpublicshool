import express from 'express';
import Settings from '../models/Settings.js';
import authMiddleware from '../middleware/auth.js';
import { upload, isCloudinaryConfigured } from '../config/cloudinary.js';

const router = express.Router();

// Get settings (return first document or create default if empty)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.status(200).json(settings);
  } catch (error) {
    console.error('Fetch settings error:', error.message);
    res.status(500).json({ success: false, message: 'Server error retrieving settings' });
  }
});

// Update settings
router.post('/', authMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      // Sync schoolName and gymName
      if (req.body.gymName && !req.body.schoolName) {
        req.body.schoolName = req.body.gymName;
      }
      if (req.body.schoolName && !req.body.gymName) {
        req.body.gymName = req.body.schoolName;
      }
      
      // Update values
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error('Update settings error:', error.message);
    res.status(500).json({ success: false, message: 'Server error saving settings' });
  }
});

// Upload about photo
router.post('/about-photo', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No photo file uploaded' });
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    // Use Cloudinary URL if configured, otherwise local static asset path
    const photoUrl = (isCloudinaryConfigured || req.file.path?.startsWith('http'))
      ? (req.file.path || req.file.secure_url)
      : `/uploads/${req.file.filename}`;

    settings.aboutPhoto = photoUrl;
    await settings.save();

    res.status(200).json({
      success: true,
      aboutPhoto: photoUrl,
      message: 'Photo uploaded successfully'
    });
  } catch (error) {
    console.error('Upload settings photo error:', error.message);
    res.status(500).json({ success: false, message: 'Server error uploading photo' });
  }
});

// Upload hero background photo
router.post('/hero-bg-photo', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No photo file uploaded' });
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    const photoUrl = (isCloudinaryConfigured || req.file.path?.startsWith('http'))
      ? (req.file.path || req.file.secure_url)
      : `/uploads/${req.file.filename}`;

    settings.heroBgPhoto = photoUrl;
    await settings.save();

    res.status(200).json({
      success: true,
      heroBgPhoto: photoUrl,
      message: 'Hero background photo uploaded successfully'
    });
  } catch (error) {
    console.error('Upload hero background photo error:', error.message);
    res.status(500).json({ success: false, message: 'Server error uploading photo' });
  }
});

export default router;
