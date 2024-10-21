module.exports = (sequelize, DataTypes) => {
  const EventHost = sequelize.define('EventHost', {
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
    tableName: 'event_host',
    timestamps: false,
  });

  // Define associations
  EventHost.associate = (models) => {
    EventHost.hasMany(models.Event, { foreignKey: 'hostId', as: 'events' });
  };

  // Return the model
  return EventHost;
};
