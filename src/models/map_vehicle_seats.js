'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class map_vehicle_seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  map_vehicle_seats.init(
    {
      map_vehicle_seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      map_vehicle_seat_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      map_vehicle_seat_row_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
        },
      },
      map_vehicle_seat_column_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
        },
      },
      map_vehicle_seat_floor_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0, 
        },
      },
      map_vehicle_seat_lock_chair: {
        type: DataTypes.TINYINT, // Trạng thái khóa ghế (1: bị khóa, 0: không khóa)
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
    },
    {
      sequelize,
      modelName: 'map_vehicle_seats', 
      tableName: 'map_vehicle_seats', 
      timestamps: false, 
    }
  );

  return map_vehicle_seats;
};