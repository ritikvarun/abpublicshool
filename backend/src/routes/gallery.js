import express from 'express';
import Gallery from '../models/Gallery.js';
import authMiddleware from '../middleware/auth.js';
import { upload, isCloudinaryConfigured } from '../config/cloudinary.js';

const router = express.Router();

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Fetch gallery error:', error.message);
    res.status(500).json({ success: false, message: 'Server error retrieving gallery items' });
  }
});

// Add a gallery item
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, tag, aspect, glowColor, desc } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image' });
    }

    const imageUrl = (isCloudinaryConfigured || req.file.path?.startsWith('http'))
      ? (req.file.path || req.file.secure_url)
      : `/uploads/${req.file.filename}`;

    const newItem = new Gallery({
      title: title || 'Campus Activity',
      tag: tag || 'campus',
      image: imageUrl,
      aspect: aspect || 'aspect-square',
      glowColor: glowColor || 'group-hover:border-neon-lime/30',
      desc: desc || ''
    });

    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    console.error('Add gallery item error:', error.message);
    res.status(500).json({ success: false, message: 'Server error uploading gallery item' });
  }
});

// Delete a gallery item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error.message);
    res.status(500).json({ success: false, message: 'Server error deleting gallery item' });
  }
});

export default router;
