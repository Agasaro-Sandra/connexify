const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update path if needed

class Event extends Model {
  static associate(models) {
    // Define association with EventHost model
    Event.belongsTo(models.EventHost, { foreignKey: 'hostId', as: 'host' });
  }
}

// Initialize the Event model with fields and options
Event.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,              // Pass the Sequelize instance
  modelName: 'Event',     // Model name in Sequelize
  tableName: 'events',    // Specify table name
  timestamps: false,      // Disable createdAt and updatedAt timestamps
});

module.exports = Event;
