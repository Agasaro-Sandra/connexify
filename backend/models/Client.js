const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update the path if needed

class Client extends Model {}

// Initialize the Client model with fields and options
Client.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  client_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  client_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  client_password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,           // Pass the Sequelize instance
  modelName: 'Client',   // Model name in Sequelize
  tableName: 'clients',  // Specify table name
  timestamps: true,   // Disable createdAt and updatedAt
  underscored: true,   // Use snake_case columns if preferred
  freezeTableName: true, // Prevent Sequelize from pluralizing table names
});

module.exports = Client;
