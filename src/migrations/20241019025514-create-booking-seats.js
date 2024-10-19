'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_seats', {
      booking_seat_id: {
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
      map_vehicle_seat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicle_seats', 
          key: 'vehicle_seat_id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      booking_seat_status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0, 
        validate: {
          min: 0,
          max: 1
        }
      },
      booking_expiration_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      is_locked: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 1
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
    await queryInterface.dropTable('booking_seats');
  }
};
