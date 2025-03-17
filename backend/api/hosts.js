const express = require('express');
const hostRoutes = require('../routes/hostRoutes'); // Update the path

const app = express();

// Middleware
app.use(express.json());

// Use the event routes
app.use('/api/hosts', hostRoutes);

// Export the app as a serverless function
module.exports = app;