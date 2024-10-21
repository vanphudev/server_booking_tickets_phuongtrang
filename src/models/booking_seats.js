'use strict';
const { Model, DataTypes } = require('sequelize');

class booking_seats extends Model {
  static associate(models) {
    
    booking_seats.belongsTo(models.trips, {
      foreignKey: 'trip_id',
      as: 'trip',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

  
    booking_seats.belongsTo(models.vehicle_seats, {
      foreignKey: 'map_vehicle_seat_id',
      as: 'vehicleSeat',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
}

booking_seats.init(
  {
    booking_seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'trip_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    map_vehicle_seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicle_seats',
        key: 'vehicle_seat_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    booking_seat_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1,
      },
    },
    booking_expiration_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_locked: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.fn('NOW'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.fn('NOW'),
      onUpdate: DataTypes.fn('NOW'),
    },
  },
  {
    sequelize,
    modelName: 'booking_seats',
    tableName: 'booking_seats',
    timestamps: false, 
  }
);

module.exports = booking_seats;
