'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trip_employees', {
      trip_id: { 
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: 'trips', 
          key: 'trip_id' 
        },
        primaryKey: true 
      },
      employee_id: { 
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: 'employees', 
          key: 'employee_id' 
        },
        primaryKey: true 
      },
      created_at: { 
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      },
      updated_at: { 
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trip_employees');
  }
};
