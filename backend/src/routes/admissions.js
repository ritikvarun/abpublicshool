import express from 'express';
import Admission from '../models/Admission.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Submit an admission inquiry
router.post('/', async (req, res) => {
  const { studentName, dateOfBirth, classSeeking, parentName, parentPhone, parentEmail, previousSchool, address } = req.body;
  try {
    if (!studentName || !dateOfBirth || !classSeeking || !parentName || !parentPhone || !parentEmail || !address) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const newAdmission = new Admission({
      studentName,
      dateOfBirth,
      classSeeking,
      parentName,
      parentPhone,
      parentEmail,
      previousSchool: previousSchool || '',
      address
    });

    await newAdmission.save();
    res.status(201).json({ success: true, message: 'Admission inquiry submitted successfully' });
  } catch (error) {
    console.error('Submit admission error:', error.message);
    res.status(500).json({ success: false, message: 'Server error processing inquiry' });
  }
});

// Get all admission inquiries (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const inquiries = await Admission.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    console.error('Fetch admissions error:', error.message);
    res.status(500).json({ success: false, message: 'Server error fetching inquiries' });
  }
});

// Update status of admission inquiry (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const admission = await Admission.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!admission) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, admission });
  } catch (error) {
    console.error('Update admission status error:', error.message);
    res.status(500).json({ success: false, message: 'Server error updating status' });
  }
});

// Delete admission inquiry (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Admission inquiry deleted' });
  } catch (error) {
    console.error('Delete admission error:', error.message);
    res.status(500).json({ success: false, message: 'Server error deleting inquiry' });
  }
});

export default router;
