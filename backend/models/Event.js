module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
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
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EventHost', // The name of the model or table it references
        key: 'id',
      },
    }
  }, {
    tableName: 'events',
    timestamps: false,
  });

  // Return the model
  return Event;
};

