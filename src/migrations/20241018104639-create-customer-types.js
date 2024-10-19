'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_types', {
      customer_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true 
      },
      customer_type_name: {
        type: Sequelize.STRING(255), 
        allowNull: false, 
        unique: true 
      },
      customer_type_description: {
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
    await queryInterface.dropTable('customer_types');
  }
};
