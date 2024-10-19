'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_types', {
      employee_type_id: {  
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true, 
      },
      employee_type_name: { 
        allowNull: false,
        type: Sequelize.STRING(255), 
        unique: true 
      },
      employee_type_description: { 
        allowNull: true,
        type: Sequelize.STRING(500) 
      },
      created_at: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      },
      updated_at: { 
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') // Tự động cập nhật
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_types');
  }
};
