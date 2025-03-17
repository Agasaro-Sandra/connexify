const express = require('express');
const authRoutes = require('../routes/auth'); // Update the path

const app = express();

// Middleware
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Export the app as a serverless function
module.exports = app;