'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicle_images', {
      vehicle_image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true, 
      },
      vehicle_image_url: {
        type: Sequelize.TEXT,
        allowNull: false, 
      },
      vehicle_image_description: {
        type: Sequelize.STRING(500),
        allowNull: true, 
      },
      vehicle_image_type: {
        type: Sequelize.STRING(50),
        allowNull: true, // Kiểu ảnh (jpg, png, gif, ...)
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('NOW'), 
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'vehicles',
          key: 'vehicle_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicle_images');
  }
};
