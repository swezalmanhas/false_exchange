// router/auth.jsx
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // <== You need an auth middleware

// Register User
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create and save user
    user = new User({ name, email, password });
    await user.save();

    // Generate JWT
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'arth', { expiresIn: '1h' });

    // Return token + user info
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'arth', { expiresIn: '1h' });

    // Return token + user info
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * GET /auth/me
 * Returns currently logged-in user's name and email.
 * User must provide a valid token in headers: { 'x-auth-token': <token> }
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.userId is set in authMiddleware if the token is valid
    const user = await User.findById(req.userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return basic user info
    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
