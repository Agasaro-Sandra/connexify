const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update the path according to your project structure

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'users', // Specify the name of the table in the database
  timestamps: false, // Set to true if you want to add createdAt and updatedAt fields
});

module.exports = User;
