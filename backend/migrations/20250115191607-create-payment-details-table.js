'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment_details', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      event_id: {  // snake_case for the foreign key
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events', // The table this foreign key references
          key: 'id',
        },
      },
      standard_ticket: {  // snake_case for the column name
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      premium_ticket: {  // snake_case for the column name
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      ticket_number: {  // snake_case for the column name
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_mode: {  // snake_case for the column name
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment_details');
  }
};
