'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('districts', {
      district_id: {
        allowNull: false,
        type: Sequelize.STRING(50),
        primaryKey: true, 
        unique: true, 
      },
      district_name: {
        type: Sequelize.STRING(255), 
        allowNull: false, 
      },
      district_description: {
        type: Sequelize.STRING(500), 
        allowNull: true, 
      },
      district_grade: {
        type: Sequelize.STRING(255), 
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
      province_id: {
        type: Sequelize.STRING(50), 
        allowNull: false, 
        references: {
          model: 'provinces', 
          key: 'province_id',
        },
        onUpdate: 'CASCADE', 
        onDelete: 'RESTRICT', 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('districts');
  }
};
