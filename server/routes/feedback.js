const express = require('express');
const auth = require('../middleware/auth');
const Feedback = require('../models/Feedback');
const { requireAdmin } = require('./auth');

const router = express.Router();

// Get all feedbacks (admin only)
router.get('/', auth, requireAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('teacher', 'name subject')
      .populate('createdBy', 'name email')
      .sort({ date: -1 });
    
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get feedbacks for a specific teacher
router.get('/teacher/:teacherId', auth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ teacher: req.params.teacherId })
      .populate('teacher', 'name subject')
      .sort({ date: -1 });
    
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new feedback (admin only)
router.post('/', auth, requireAdmin, async (req, res) => {
  try {
    const { student, avatar, course, rating, text, teacherId } = req.body;
    
    const feedback = new Feedback({
      student,
      avatar,
      course,
      rating,
      text,
      teacher: teacherId,
      createdBy: req.user.userId
    });
    
    await feedback.save();
    
    // Populate the saved feedback with related data
    await feedback.populate('teacher', 'name subject');
    await feedback.populate('createdBy', 'name email');
    
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update feedback (admin only)
router.put('/:id', auth, requireAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('teacher', 'name subject');
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete feedback (admin only)
router.delete('/:id', auth, requireAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;