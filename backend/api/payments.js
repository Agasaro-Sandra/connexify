const express = require('express');
const paymentRoutes = require('../routes/paymentRoutes'); // Update the path

const app = express();

// Middleware
app.use(express.json());

// Use the event routes
app.use('/api/payments', paymentRoutes);

// Export the app as a serverless function
module.exports = app;