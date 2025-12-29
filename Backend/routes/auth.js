const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js')


router.post('/register', async(req, res)=>{
    const {userName, email, password} = req.body;

    try {
      // Validate input
      if(!userName || !email || !password) {
        return res.status(400).json({msg: 'Please provide userName, email, and password'});
      }

      // 1. Check if user already exists
      let user = await User.findOne({email});
      if(user){
        return res.status(400).json({msg: 'User already exists'})
      }
      
     // 2. Create new user instance
     user = new User ({
        userName,
        email,
        password
     });
     
     // 3. Hash the password
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password, salt);

     // 4. Save to database
     await user.save();

     // 5. Create and return JWT
     const payload = {user: {id: user.id}};

     jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: '1h'},
      (err, token) => {
        if(err) {
          console.error('JWT signing error:', err);
          return res.status(500).json({msg: 'Error creating token'});
        }
        res.json({ token, userName: user.userName })
      }
     );

    }catch(error){
      console.error('Registration error:', error.message);
      res.status(500).json({msg: 'Server Error: ' + error.message});
    }
});

// @route POST api/auth/login
// @desc Authenticate user & get token

router.post('/login', async(req, res) => {
  const {email, password} = req.body;

  try {
    // 1. Check if user exists
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({msg: 'Invalid Credentials'})
    }
    // 2. Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({msg: 'Invalid Credentials'})
    }
    // 3. Create and return JWT
    const payload = {user: {id: user.id}};
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: '1h'},
      (err, token) => {
        if(err) throw err;
        res.json({token, userName: user.userName});
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;