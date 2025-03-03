const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update path if needed

class Event extends Model {
  static associate(models) {
    // Define association with EventHost model
    Event.belongsTo(models.EventHost, { foreignKey: 'hostId', as: 'host' });

    // Define association with PaymentDetails model
    Event.hasOne(models.PaymentDetails, { foreignKey: 'eventId', as: 'payment' });
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
  keyword: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  hostId: { // Foreign key to EventHost
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'event_host', // Referencing the table name of EventHost
      key: 'id',
    },
  },
}, {
  sequelize,              // Pass the Sequelize instance
  modelName: 'Event',     // Model name in Sequelize
  tableName: 'events',    // Specify table name
  timestamps: false,      // Disable createdAt and updatedAt timestamps
  underscored: true
});

module.exports = Event;
