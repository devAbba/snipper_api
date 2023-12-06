'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Urls', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      full: {
        type: Sequelize.STRING
      },
      short: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Urls');
  }
};