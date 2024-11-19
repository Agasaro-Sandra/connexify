const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update path if needed

class EventHost extends Model {
  static associate(models) {
    // Define association with Event model
    EventHost.hasMany(models.Event, { foreignKey: 'hostId', as: 'events' });
  }
}

// Initialize the EventHost model with fields and options
EventHost.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  companyAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,              // Pass the Sequelize instance
  modelName: 'EventHost', // Model name in Sequelize
  tableName: 'event_host', // Specify table name
  timestamps: false,      // Disable createdAt and updatedAt timestamps
});

module.exports = EventHost;
