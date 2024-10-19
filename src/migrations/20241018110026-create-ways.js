'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ways', {
      way_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true, 
      },
      way_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, 
      },
      way_description: {
        type: Sequelize.STRING(500),
        allowNull: true, 
      },
      is_locked: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: 0, // Mặc định là không khóa (0)
      },
      last_lock_at: {
        type: Sequelize.DATE,
        allowNull: true, 
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ways');
  },
};
