'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('provinces', {
      province_id: {
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.STRING(50), 
        unique: true 
      },
      province_name: {
        type: Sequelize.STRING(255), 
        allowNull: false, 
      },
      province_grade: {
        type: Sequelize.STRING(255), 
        allowNull: true
      },
      province_description: {
        type: Sequelize.STRING(500), 
        allowNull: true 
      },
      created_at: {
        allowNull: true, 
        type: Sequelize.TIMESTAMP,
        defaultValue: Sequelize.fn('NOW') 
      },
      updated_at: {
        allowNull: true, 
        type: Sequelize.TIMESTAMP,
        defaultValue: Sequelize.fn('NOW'), 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('provinces');
  }
};
