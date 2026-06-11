const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// helper to generate JWT
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Validation errors middleware handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Please fill in all fields')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Please fill in all fields')
    .isEmail().withMessage('Please enter a valid email address')
    .escape(),
  body('password')
    .notEmpty().withMessage('Please fill in all fields')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Please fill in all fields')
    .isEmail().withMessage('Please enter a valid email address')
    .escape(),
  body('password')
    .notEmpty().withMessage('Please fill in all fields')
];

// POST /api/auth/register
router.post('/register', registerValidation, handleValidationErrors, async function(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', loginValidation, handleValidationErrors, async function(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/me  - get logged in user info
router.get('/me', protect, async function(req, res) {
  res.json({
    user: { id: req.user._id, name: req.user.name, email: req.user.email },
  });
});

module.exports = router;
