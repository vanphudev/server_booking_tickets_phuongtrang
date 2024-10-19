'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trips', {
      trip_id: { 
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      trip_arrival_time: {
        allowNull: false,
        type: Sequelize.DATE 
      },
      trip_departure_time: {
        allowNull: false,
        type: Sequelize.DATE 
      },
      trip_date: { 
        allowNull: false,
        type: Sequelize.DATE 
      },
      trip_price: { 
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2) 
      },
      trip_discount: { 
        type: Sequelize.DECIMAL(5, 2), 
        validate: {
          min: 0 
        }
      },
      trip_shuttle_enable: { 
        type: Sequelize.TINYINT, 
        defaultValue: 0 
      },
      allow_online_booking: { 
        type: Sequelize.TINYINT, 
        defaultValue: 0 
      },
      trip_holiday: { 
        type: Sequelize.TINYINT, 
        defaultValue: 0 
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
      },
      route_id: { 
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: 'routes', 
          key: 'route_id' 
        }
      },
      vehicle_id: { 
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: 'vehicles', 
          key: 'vehicle_id' 
        }
      },
      map_vehicle_seat_id: { 
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: 'map_vehicle_seats', 
          key: 'map_vehicle_seat_id' 
        }
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trips');
  }
};
