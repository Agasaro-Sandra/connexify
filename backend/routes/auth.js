const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();

const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    // Retrieve the newly created user's ID
    const [newUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

    // Create a JWT token
    const token = jwt.sign({ userId: newUser[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// SignUp Route
router.post('/signup', async (req, res) => {
  const { client_name, client_email, client_password } = req.body;

  try {
    // Check if client already exists
    const [existingUser] = await pool.query('SELECT * FROM clients WHERE client_email = ?', [client_email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(client_password, 10);

    // Insert the new user into the database
    await pool.query('INSERT INTO clients (client_name, client_email, client_password) VALUES (?, ?, ?)', [client_name, client_email, hashedPassword]);

    // Retrieve the newly created user's ID
    const [newUser] = await pool.query('SELECT id FROM clients WHERE client_email = ?', [client_email]);

    // Create a JWT token
    const token = jwt.sign({ userId: newUser[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enter Route
router.post('/enter', async (req, res) => {
  const { client_email, client_password } = req.body;

  try {
    // Check if client exists
    const [user] = await pool.query('SELECT * FROM clients WHERE client_email = ?', [client_email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(client_password, user[0].client_password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;