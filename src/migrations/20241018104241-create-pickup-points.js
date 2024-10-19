'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pickup_points', {
      pickup_point_way_id: {
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      pickup_point_office_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'offices', 
          key: 'id'
        }
      },
      pickup_point_name: {
        allowNull: false,
        type: Sequelize.STRING(500) 
      },
      pickup_point_time: {
        allowNull: true,
        type: Sequelize.INTEGER,
        validate: {
          min: 0 
        }
      },
      pickup_point_kind: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          isInt: true 
        }
      },
      pickup_point_description: {
        allowNull: true,
        type: Sequelize.STRING(500) 
      },
      point_kind_name: {
        allowNull: true,
        type: Sequelize.STRING(500) 
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
    await queryInterface.dropTable('pickup_points');
  }
};