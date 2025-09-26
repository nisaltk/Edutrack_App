const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Define admin users (hardcoded for demo)
const ADMIN_USERS = {
  'admin@edutrack.com': {
    password: 'admin123',
    name: 'System Administrator',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  'nisal@edutrack.com': {
    password: 'nisal123',
    name: 'Nisal Perera',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80'
  }
};

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if it's an admin user first
    if (ADMIN_USERS[email] && ADMIN_USERS[email].password === password) {
      const adminUser = ADMIN_USERS[email];
      
      const token = jwt.sign(
        { 
          userId: email, 
          email: email,
          role: adminUser.role 
        },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '7d' }
      );
      
      return res.json({
        success: true,
        token,
        user: {
          id: email,
          name: adminUser.name,
          email: email,
          role: adminUser.role,
          avatar: adminUser.avatar
        }
      });
    }
    
    // Check if it's a regular user in database
    const user = await User.findOne({ email });
    if (user && (await user.correctPassword(password, user.password))) {
      const token = jwt.sign(
        { 
          userId: user._id, 
          email: user.email,
          role: user.role 
        },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '7d' }
      );
      
      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      });
    }
    
    return res.status(401).json({ 
      success: false,
      message: 'Invalid email or password' 
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login' 
    });
  }
});

// Register endpoint for new users
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }
    
    // Check if trying to register as admin (not allowed)
    if (ADMIN_USERS[email]) {
      return res.status(400).json({ 
        success: false,
        message: 'Cannot register admin email' 
      });
    }
    
    // Create new user with 'user' role (not admin)
    const user = await User.create({ 
      name, 
      email, 
      password,
      role: 'user', // Always set to user role, not admin
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    });
    
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration' 
    });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    // For demo purposes, return a mock user
    // In real app, you'd get user from JWT token
    res.json({
      success: true,
      user: {
        id: '1',
        name: 'Demo User',
        email: 'user@example.com',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        phone: '+1 (555) 123-4567',
        department: 'Education',
        joinDate: '2023-01-15'
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching profile' 
    });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    // For demo purposes, just return success
    // In real app, you'd update the user in database
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: req.body
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error updating profile' 
    });
  }
});

// Check if user is admin middleware
const requireAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { router, requireAdmin };



