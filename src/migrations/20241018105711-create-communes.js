'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('communes', {
      commune_id: {
        type: Sequelize.STRING(50), 
        allowNull: false, 
        primaryKey: true, 
        unique: true,
      },
      commune_name: {
        type: Sequelize.STRING(255), 
        allowNull: false, 
      },
      commune_description: {
        type: Sequelize.STRING(255), 
        allowNull: true, 
      },
      commune_grade: {
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
      district_id: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'districts', 
          key: 'district_id', 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'RESTRICT', 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('communes');
  }
};
