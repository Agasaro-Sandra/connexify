const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('mysql://root:Sandra_123@localhost:3306/connexify', {
    dialect: 'mysql',
    logging: false, // Optional: Disable query logging
});

// Define the Booking model
const Booking = sequelize.define(
    'Booking',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        names: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        ticket_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        number_of_tickets: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        account_number: {
            type: DataTypes.DECIMAL(12, 2), // Match the updated column definition
            allowNull: false,
        },        
    },
    {
        tableName: 'bookings',
        timestamps: false, // Disable createdAt/updatedAt fields
        underscored: true, // Use snake_case column names
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
        hooks: {
            beforeCreate: (booking) => {
                booking.number_of_tickets = parseFloat(booking.number_of_tickets).toFixed(2);
                booking.account_number = parseFloat(booking.account_number).toFixed(2);
            },
        },
    }
);

// Test the database connection and sync the model
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync the model with the database
        await sequelize.sync({ alter: true }); // Use { force: true } for development if you want to recreate tables
        console.log('Database synchronized successfully.');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();

module.exports = Booking;
