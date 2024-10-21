const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Sequelize instance for database connection
const sequelize = require('./config/database'); // Adjust the path as necessary
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events'); // Import the new event routes
const hostRoutes = require('./routes/hosts'); // Import host routes (if needed)
const paymentRoutes = require('./routes/payments'); // Import payment routes (if needed)

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Sync database and handle errors
sequelize.sync({ force: true }) // Use `alter: true` to make sure the table structure updates without dropping existing data
  .then(() => {
    console.log('Database & tables created!');
    // Start the server after the database is ready
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error creating database tables:', err);
    process.exit(1); // Exit the process with failure if there's an error
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); // Add the event routes
app.use('/api/hosts', hostRoutes); // Add the host routes if needed
app.use('/api/payments', paymentRoutes); // Add the payment routes if needed
