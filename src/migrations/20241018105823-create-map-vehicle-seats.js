'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('map_vehicle_seats', {
      map_vehicle_seat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      map_vehicle_seat_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, 
      },
      map_vehicle_seat_row_no: {
        type: Sequelize.INTEGER,
        allowNull: true, 
        validate: {
          min: 1,
        },
      },
      map_vehicle_seat_column_no: {
        type: Sequelize.INTEGER,
        allowNull: true, 
        validate: {
          min: 1, 
        },
      },
      map_vehicle_seat_floor_no: {
        type: Sequelize.INTEGER,
        allowNull: true, 
        validate: {
          min: 0, // Không âm (ví dụ: tầng 1, 2...)
        },
      },
      map_vehicle_seat_lock_chair: {
        type: Sequelize.TINYINT, // Trạng thái khóa ghế (1: bị khóa, 0: không khóa)
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('map_vehicle_seats');
  },
};
