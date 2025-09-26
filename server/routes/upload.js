const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const router = express.Router();

// Upload image
router.post('/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'teacher-performance'
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

module.exports = router;