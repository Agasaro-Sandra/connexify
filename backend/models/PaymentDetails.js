const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update the path if needed

class PaymentDetails extends Model {
  static associate(models) {
    // Define association with Event model
    PaymentDetails.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
  }
}

// Initialize the PaymentDetails model with fields and options
PaymentDetails.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  event_id: { // Foreign key to Event
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'events', // Use the table name here
      key: 'id',
    },
  },
  standard_ticket: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  premium_ticket: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ticket_number: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  payment_mode: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,             // Pass the Sequelize instance
  modelName: 'PaymentDetails', // Model name in Sequelize
  tableName: 'payment_details', // Specify table name
  timestamps: true,     // Disable createdAt and updatedAt timestamps
  underscored: true,
  freezeTableName: true,
});

module.exports = PaymentDetails;
