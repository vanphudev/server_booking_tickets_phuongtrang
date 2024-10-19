'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offices', {
      office_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true,
        unique: true, 
      },
      office_name: {
        type: Sequelize.STRING(500), 
        allowNull: false, 
        unique: true, 
      },
      office_address: {
        type: Sequelize.TEXT, 
        allowNull: true, 
      },
      office_phone: {
        type: Sequelize.STRING(20), 
        allowNull: true, 
        unique: true, 
      },
      office_fax: {
        type: Sequelize.STRING(20), 
        allowNull: true,
      },
      office_description: {
        type: Sequelize.TEXT, 
        allowNull: true, 
      },
      office_latitude: {
        type: Sequelize.TEXT, 
        allowNull: true, 
      },
      office_longitude: {
        type: Sequelize.TEXT, 
        allowNull: true, 
      },
      office_map_url: {
        type: Sequelize.TEXT, 
        allowNull: true, 
      },
      is_locked: {
        type: Sequelize.TINYINT, 
        allowNull: true, 
        defaultValue: 0, 
      },
      last_lock_at: {
        type: Sequelize.DATE, // Kiểu TIMESTAMP
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
      commune_id: {
        type: Sequelize.STRING(50), 
        allowNull: false, 
        references: {
          model: 'communes', 
          key: 'commune_id', 
        },
        onUpdate: 'CASCADE', // Cập nhật liên quan
        onDelete: 'RESTRICT', // Hạn chế xóa nếu có liên kết
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('offices');
  }
};
