const express = require('express');
const eventRoutes = require('../routes/eventRoutes'); // Update the path

const app = express();

// Middleware
app.use(express.json());

// Use the event routes
app.use('/api/events', eventRoutes);

// Export the app as a serverless function
module.exports = app;