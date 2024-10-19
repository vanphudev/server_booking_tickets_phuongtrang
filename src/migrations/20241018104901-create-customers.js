'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true 
      },
      customer_full_name: {
        type: Sequelize.STRING(255), 
        allowNull: false 
      },
      customer_phone: {
        type: Sequelize.STRING(20), 
        allowNull: false, 
        unique: true
      },
      customer_email: {
        type: Sequelize.STRING(500), 
        allowNull: false, 
        unique: true
      },
      customer_gender: {
        type: Sequelize.TINYINT, 
        allowNull: true 
      },
      customer_birthday: {
        type: Sequelize.DATE, 
        allowNull: true
      },
      customer_avatar_url: {
        type: Sequelize.TEXT,
        allowNull: true 
      },
      customer_destination_address: {
        type: Sequelize.JSON, 
        allowNull: true 
      },
      customer_password: {
        type: Sequelize.STRING(500), 
        allowNull: false 
      },
      is_disabled: {
        type: Sequelize.TINYINT, 
        allowNull: true 
      },
      last_login_at: {
        type: Sequelize.TIMESTAMP,
        allowNull: true 
      },
      access_token: {
        type: Sequelize.TEXT, 
        allowNull: true 
      },
      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: true 
      },
      last_refresh_token: {
        type: Sequelize.TIMESTAMP, 
        allowNull: true 
      },
      is_deleted: {
        type: Sequelize.TINYINT, 
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
      },
      customer_type_id: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'customer_types', 
          key: 'customer_type_id', 
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
