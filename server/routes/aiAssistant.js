const express = require('express');
const auth = require('../middleware/auth');
const AIChat = require('../models/AIChat');

const router = express.Router();

// Get chat history
router.get('/history', auth, async (req, res) => {
  try {
    const chats = await AIChat.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send message to AI assistant
router.post('/chat', auth, async (req, res) => {
  try {
    const { message } = req.body;

    // In a real application, this would call an AI API
    // For demo purposes, we'll generate a mock response
    const responses = [
      "Based on the performance data, I recommend focusing on differentiated instruction strategies.",
      "The student feedback suggests that interactive activities are highly effective in your classroom.",
      "Looking at the training history, you might benefit from the upcoming classroom management workshop.",
      "The performance metrics show improvement in student engagement over the last quarter.",
      "Consider implementing more project-based learning approaches based on the success patterns I've observed."
    ];

    const aiResponse = responses[Math.floor(Math.random() * responses.length)];

    // Save chat to database
    const chat = new AIChat({
      user: req.user.id,
      message,
      response: aiResponse
    });

    await chat.save();

    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;