'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicles', {
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      vehicle_license_plate: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      vehicle_model: {
        type: Sequelize.STRING(255),
        allowNull: true, 
      },
      vehicle_brand: {
        type: Sequelize.STRING(255),
        allowNull: true, 
      },
      vehicle_capacity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: { min: 1 }, // Số ghế phải lớn hơn 0
      },
      vehicle_manufacture_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: { min: 1800, max: new Date().getFullYear() }, // Năm từ 1800 đến hiện tại
      },
      vehicle_color: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      vehicle_description: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      is_locked: {
        type: Sequelize.TINYINT,
        allowNull: true, // 1: Bị khóa, 0: Không khóa
      },
      last_lock_at: {
        type: Sequelize.DATE,
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
      map_vehicle_seat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'map_vehicle_seats',
          key: 'map_vehicle_seat_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      office_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'office_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      vehicle_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicle_types',
          key: 'vehicle_type_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicles');
  },
};
