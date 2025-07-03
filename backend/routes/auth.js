const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Sequelize User model
const { body, validationResult } = require('express-validator');

const JWT_SECRET = 'yash@isarockstar';

// === Middleware to fetch logged-in user ===
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Access Denied: No Token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid Token' });
  }
};

// === Create User ===
router.post('/createuser', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: secPass,
    });

    const data = { user: { id: newUser.id, email: newUser.email } };
    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, authToken, user: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// === Login User ===
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const payload = { user: { id: user.id, email: user.email } };
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      authToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// === Get Authenticated User ===
router.post('/getUser', fetchUser, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'phone']
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error has occurred");
  }
});

module.exports = router;
