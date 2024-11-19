const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();
const { Event, EventHost, PaymentDetails } = require('../models');

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

// Add Event Route
router.post('/events', async (req, res) => {
  const { title, description, date, time, address } = req.body;

  try {
    // Validate required fields
    if (!title || !date || !time || !address) {
      return res.status(400).json({ message: 'Please provide title, date, time, and address.' });
    }

    // Create a new event using the Sequelize model
    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      address,
    });

    // Return the created event along with its ID
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add Host Route
router.post('/hosts', async (req, res) => {
  const { companyName, companyAddress, contact, eventId } = req.body;

  try {
    // Validate required fields
    if (!companyName || !companyAddress || !contact || !eventId) {
      return res.status(400).json({ message: 'Please provide companyName, contact, and eventId.' });
    }

    // Ensure the event exists before adding the host
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create a new host using the Sequelize model
    const newHost = await EventHost.create({
      companyName,
      companyAddress,
      contact,
      eventId, // Associate the host with the event
    });

    res.status(201).json({ message: 'Host added successfully', host: newHost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add Payment Route
router.post('/payments', async (req, res) => {
  const { standardTicket, premiumTicket, ticketNumber, paymentMode, eventId } = req.body;

  try {
    // Validate required fields
    if (!standardTicket|| !premiumTicket || !ticketNumber || !paymentMode || !eventId) {
      return res.status(400).json({ message: 'Please provide standardTicket paymentMethod, and eventId.' });
    }

    // Ensure the event exists before adding the payment
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create a new payment using the Sequelize model
    const newPayment = await PaymentDetails.create({
      standardTicket,
      premiumTicket,
      ticketNumber,
      paymentMode,
      eventId, // Associate the payment with the event
    });

    res.status(201).json({ message: 'Payment added successfully', payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;