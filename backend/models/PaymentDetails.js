module.exports = (sequelize, DataTypes) => {
  const PaymentDetails = sequelize.define('PaymentDetails', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eventId: { // Foreign key to Event
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events', // Use the table name here
        key: 'id',
      },
    },
    standardTicket: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    premiumTicket: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'payment_details',
    timestamps: false,
  });

  // Define associations
  PaymentDetails.associate = (models) => {
    PaymentDetails.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
  };

  // Return the model
  return PaymentDetails;
};
