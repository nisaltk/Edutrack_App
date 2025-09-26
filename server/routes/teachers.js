const express = require('express');
const auth = require('../middleware/auth');
const Teacher = require('../models/Teacher');

const router = express.Router();

// Get all teachers
router.get('/', auth, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error.message);
    res.status(500).json({ error: 'Server error while fetching teachers' });
  }
});

module.exports = router;
