import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

// Admin Login
router.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    let admin = null;
    try {
      admin = await Admin.findOne({ email });
    } catch (dbErr) {
      console.warn('Database query failed, using hardcoded fallback admin credentials:', dbErr.message);
    }

    if (!admin) {
      if (email === 'admin@school.com' && password === 'admin123') {
        const token = jwt.sign({ id: 'fallback-admin-id', email: 'admin@school.com' }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
        return res.status(200).json({
          success: true,
          token,
          message: 'Logged in successfully (Fallback Admin)'
        });
      }
      return res.status(400).json({ success: false, message: 'Invalid admin credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid admin credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      token,
      message: 'Logged in successfully'
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: 'Server login error' });
  }
});

// Get Admin Profile (verifies token, returns admin info)
router.get('/getadmin', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Token is expired or invalid' });
    }

    // Fallback admin (hardcoded credentials)
    if (decoded.id === 'fallback-admin-id') {
      return res.status(200).json({ success: true, email: 'admin@school.com', role: 'admin' });
    }

    // Real DB admin
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, email: admin.email, role: 'admin' });
  } catch (error) {
    console.error('getAdmin error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin Logout
router.get('/logout', (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

export default router;
