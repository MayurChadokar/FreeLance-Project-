const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Controller for creating a user
const createUser = async (req, res) => {
  try {
    const { name, grNumber, password } = req.body;

    if (!name || !grNumber || !password) {
      return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    const existingUser = await User.findOne({ grNumber });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, grNumber, password: hashedPassword });

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        grNumber: newUser.grNumber,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  try {
    const { grNumber, password } = req.body;

    if (!grNumber || !password) {
      return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    const user = await User.findOne({ grNumber });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const payload = {
      
      name: user.name,
      grNumber: user.grNumber,
     
    };
  console.log(payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
      user: payload,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};




module.exports = { createUser, loginUser };
