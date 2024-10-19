'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      employee_id: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_full_name: { 
        allowNull: false,
        type: Sequelize.STRING(500) 
      },
      employee_email: { 
        allowNull: false,
        type: Sequelize.STRING(500),
        unique: true 
      },
      employee_phone: { 
        allowNull: false,
        type: Sequelize.STRING(20),
        unique: true 
      },
      employee_username: { 
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true 
      },
      employee_birthday: { 
        type: Sequelize.DATE,
        validate: {
          isDate: true,
          isBefore: '2100-12-31',
          isAfter: '1900-01-01'
        }
      },
      employee_password: { 
        allowNull: false,
        type: Sequelize.STRING(255) 
      },
      employee_profile_image: { 
        type: Sequelize.TEXT 
      },
      employee_gender: { 
        type: Sequelize.TINYINT,
        validate: {
          isIn: [[0, 1, -1]] 
        }
      },
      access_token: { 
        type: Sequelize.TEXT 
      },
      refresh_token: { 
        type: Sequelize.TEXT 
      },
      last_refresh_token: { 
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      is_first_activation: { 
        type: Sequelize.TINYINT,
        defaultValue: 1,
        validate: {
          isIn: [[0, 1]]
        }
      },
      is_locked: { 
        type: Sequelize.TINYINT,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1]]
        }
      },
      last_lock_at: { 
        type: Sequelize.DATE 
      },
      created_at: { 
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: { 
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      office_id: { 
        type: Sequelize.INTEGER,
        references: {
          model: 'offices', 
          key: 'office_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      employee_type_id: { 
        type: Sequelize.INTEGER,
        references: {
          model: 'employee_types',
          key: 'employee_type_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};
