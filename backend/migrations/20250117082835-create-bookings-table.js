module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creating the 'bookings' table with the updated fields
    await queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      names: {
        type: Sequelize.STRING(100),
        allowNull: false,  // Assuming names is required
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,   // Email is nullable, just like last_name was before
        unique: false
      },
      ticket_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      number_of_tickets: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      account_number: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Dropping the 'bookings' table in case of rollback
    await queryInterface.dropTable('bookings');
  }
};
