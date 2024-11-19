const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update the path if needed

class User extends Model {}

// Initialize the User model with fields and options
User.init({
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
  sequelize,           // Pass the Sequelize instance
  modelName: 'User',   // Model name in Sequelize
  tableName: 'users',  // Specify table name
  timestamps: false,   // Disable createdAt and updatedAt
  underscored: true,   // Use snake_case columns if preferred
  freezeTableName: true, // Prevent Sequelize from pluralizing table names
});

module.exports = User;
