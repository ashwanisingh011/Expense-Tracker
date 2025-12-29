const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
router.post('/register', async (req, res) =>   {
  const { userName, email, password } = req.body;

  console.log('📝 Registration attempt:', { userName, email, passwordLength: password?.length });

  try {
    // 1. Validation check
    if (!userName || !email || !password) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({ msg: 'Please provide all fields' });
    }

    // 2. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('❌ User already exists with email:', email);
      return res.status(400).json({ msg: 'User already exists with this email' });
    }

    console.log('✅ User validation passed, creating user...');

    // 3. Create new user instance
    user = new User({
      userName,
      email,
      password
    });

    // 4. Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 5. Save to database
    await user.save();
    console.log('✅ User saved to database with ID:', user.id);

    // 6. Create and return JWT
    const payload = { user: { id: user.id } };

    // ERROR PROTECTION: Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("❌ FATAL ERROR: JWT_SECRET is not defined in your Backend/.env file");
      return res.status(500).json({ msg: 'Server Config Error: Missing JWT_SECRET' });
    }

    console.log('✅ JWT_SECRET found, signing token...');

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('❌ JWT signing error:', err);
          return res.status(500).json({ msg: 'Error creating token: ' + err.message });
        }
        console.log('✅ Registration successful! Token created');
        // Returning userName ensures the frontend can display it correctly
        res.json({ token, userName: user.userName });
      }
    );
  } catch (err) {
    // Log the actual error to your terminal
    console.error("❌ Registration Error Detail:", err.message);
    console.error("Error stack:", err.stack);
    // Send the actual error message to the frontend toast
    res.status(500).json({ msg: 'Backend Error: ' + err.message });
  }
});

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err);
          return res.status(500).json({ msg: 'Error creating token' });
        }
        res.json({ token, userName: user.userName });
      }
    );
  } catch (err) {
    console.error("Login Error Detail:", err.message);
    res.status(500).json({ msg: 'Backend Error: ' + err.message });
  }
});

module.exports = router;