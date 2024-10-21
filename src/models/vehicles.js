'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vehicles extends Model {
    static associate(models) {
      this.belongsTo(models.MapVehicleSeats, {
        foreignKey: 'map_vehicle_seat_id',
        as: 'mapVehicleSeat',
        onDelete: 'SET NULL',
      });

      this.belongsTo(models.Offices, {
        foreignKey: 'office_id',
        as: 'office',
        onDelete: 'SET NULL',
      });

      this.belongsTo(models.VehicleTypes, {
        foreignKey: 'vehicle_type_id',
        as: 'vehicleType',
        onDelete: 'SET NULL',
      });
    }
  }

  Vehicles.init(
    {
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      vehicle_license_plate: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      vehicle_model: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      vehicle_brand: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      vehicle_capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 1 }, // Số ghế phải lớn hơn 0
      },
      vehicle_manufacture_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 1800, max: new Date().getFullYear() }, // Năm từ 1800 đến hiện tại
      },
      vehicle_color: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      vehicle_description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_locked: {
        type: DataTypes.TINYINT,
        allowNull: true, // 1: Bị khóa, 0: Không khóa
      },
      last_lock_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn('NOW'),
      },
      map_vehicle_seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vehicle_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Vehicles',
      tableName: 'vehicles',
      timestamps: false,
    }
  );

  return Vehicles;
};
