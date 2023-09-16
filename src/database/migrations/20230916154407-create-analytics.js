'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Analytics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      clicks: {
        type: Sequelize.INTEGER
      },
      urlId: {
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
    await queryInterface.dropTable('Analytics');
  }
};