const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comments: String,
  reviewer: {
    type: String,
    required: true,
  },
});

const studentFeedbackSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comments: String,
  course: String,
});

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: String,
  provider: String,
  certificate: String,
  skills: [String],
});

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['award', 'promotion', 'certification', 'achievement'],
  },
});

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  subject: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: '',
  },
  performanceReviews: [performanceReviewSchema],
  studentFeedback: [studentFeedbackSchema],
  training: [trainingSchema],
  milestones: [milestoneSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Teacher', teacherSchema);