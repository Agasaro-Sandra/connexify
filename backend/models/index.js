const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Ensure this points to your DB config

const db = {};

// Read all files in the current directory, filter out index.js
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // Use 'require' to import each model, and invoke the exported function with sequelize and DataTypes
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Add the model to the db object
  });

// Define associations, if any
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Set up model associations
  }
});

// Sync models after associations
sequelize.sync({ alter: true })
  .then(() => {
    console.log('All tables synced successfully');
  })
  .catch(error => {
    console.error('Error syncing tables:', error);
  });

// Export the sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
