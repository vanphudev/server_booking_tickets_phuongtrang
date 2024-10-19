'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      trip_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'trips', 
          key: 'trip_id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      booking_seat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'booking_seats', 
          key: 'booking_seat_id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ticket_name_chair: {
        type: Sequelize.STRING(255),
        allowNull: true 
      },
      is_export_ticket: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0, 
        validate: {
          min: 0,
          max: 1
        }
      },
      ticket_amount: {
        type: Sequelize.DECIMAL(10, 2), 
        validate: {
          min: 0.01 
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        onUpdate: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
  }
};
