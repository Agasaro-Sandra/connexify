const express = require('express');
const bookingRoutes = require('../routes/bookingRoutes'); // Update the path

const app = express();

// Middleware
app.use(express.json());

// Use the event routes
app.use('/api/booking', bookingRoutes);

// Export the app as a serverless function
module.exports = app;