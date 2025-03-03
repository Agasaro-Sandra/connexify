'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
        username: 'ineza',
        email : 'ineza@gmail.com',
        password : '$2b$10$Tf.LNHD3y9pJt9E1IzFynukMgFhpzQ.TNnJ9DL3bF2GyZvhsWn2jW',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
