'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('office_images', {
      office_image_id: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        primaryKey: true, // Khóa chính
        autoIncrement: true,
        unique: true, 
      },
      office_image_url: {
        type: Sequelize.TEXT,
        allowNull: false, 
        unique: true, 
      },
      office_image_description: {
        type: Sequelize.STRING(255), 
        allowNull: true, 
      },
      office_image_type: {
        type: Sequelize.STRING(50), 
        allowNull: true, 
      },
      created_at: {
        type: Sequelize.DATE, // Kiểu TIMESTAMP
        allowNull: true, 
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE, // Kiểu TIMESTAMP
        allowNull: true,
        defaultValue: Sequelize.fn('NOW'), 
      },
      office_id: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'offices', 
          key: 'office_id', 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('office_images');
  }
};
