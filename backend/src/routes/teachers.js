import express from 'express';
import Teacher from '../models/Teacher.js';
import authMiddleware from '../middleware/auth.js';
import { upload, isCloudinaryConfigured } from '../config/cloudinary.js';

const router = express.Router();

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Fetch teachers error:', error.message);
    res.status(500).json({ success: false, message: 'Server error retrieving teachers list' });
  }
});

// Add a teacher
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, role, exp, instagram, twitter, certs, themeColor } = req.body;
    
    if (!name || !role || !exp) {
      return res.status(400).json({ success: false, message: 'Name, role, and experience are required' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Profile image is required' });
    }

    const imageUrl = (isCloudinaryConfigured || req.file.path?.startsWith('http'))
      ? (req.file.path || req.file.secure_url)
      : `/uploads/${req.file.filename}`;

    // Parse certs array from string/json if sent
    let parsedCerts = [];
    if (certs) {
      try {
        parsedCerts = typeof certs === 'string' ? JSON.parse(certs) : certs;
      } catch (err) {
        parsedCerts = certs.split(',').map(c => c.trim()).filter(Boolean);
      }
    }

    const newTeacher = new Teacher({
      name,
      role,
      exp,
      image: imageUrl,
      instagram: instagram || '',
      twitter: twitter || '',
      certs: parsedCerts,
      themeColor: themeColor || 'lime'
    });

    await newTeacher.save();
    res.status(201).json({ success: true, teacher: newTeacher });
  } catch (error) {
    console.error('Add teacher error:', error.message);
    res.status(500).json({ success: false, message: 'Server error creating teacher profile' });
  }
});

// Update a teacher
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, role, exp, instagram, twitter, certs, themeColor } = req.body;
    const teacherId = req.params.id;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    if (name) teacher.name = name;
    if (role) teacher.role = role;
    if (exp) teacher.exp = exp;
    if (instagram !== undefined) teacher.instagram = instagram;
    if (twitter !== undefined) teacher.twitter = twitter;
    if (themeColor) teacher.themeColor = themeColor;

    if (certs) {
      try {
        teacher.certs = typeof certs === 'string' ? JSON.parse(certs) : certs;
      } catch (err) {
        teacher.certs = certs.split(',').map(c => c.trim()).filter(Boolean);
      }
    }

    if (req.file) {
      teacher.image = (isCloudinaryConfigured || req.file.path?.startsWith('http'))
        ? (req.file.path || req.file.secure_url)
        : `/uploads/${req.file.filename}`;
    }

    await teacher.save();
    res.status(200).json({ success: true, teacher });
  } catch (error) {
    console.error('Update teacher error:', error.message);
    res.status(500).json({ success: false, message: 'Server error updating teacher profile' });
  }
});

// Delete a teacher
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.status(200).json({ success: true, message: 'Teacher profile deleted successfully' });
  } catch (error) {
    console.error('Delete teacher error:', error.message);
    res.status(500).json({ success: false, message: 'Server error deleting teacher profile' });
  }
});

export default router;
