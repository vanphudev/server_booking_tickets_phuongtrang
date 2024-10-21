'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      trips.belongsTo(models.Route, {
        foreignKey: 'route_id',
        as: 'route',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      trips.belongsTo(models.Vehicle, {
        foreignKey: 'vehicle_id',
        as: 'vehicle',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      
      trips.belongsTo(models.MapVehicleSeat, {
        foreignKey: 'map_vehicle_seat_id',
        as: 'mapVehicleSeat',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
    }
  }

  trips.init(
    {
      trip_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      trip_arrival_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      trip_departure_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      trip_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      trip_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      trip_discount: {
        type: DataTypes.DECIMAL(5, 2),
        validate: {
          min: 0,
        },
      },
      trip_shuttle_enable: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      allow_online_booking: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      trip_holiday: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'routes',
          key: 'route_id',
        },
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicles',
          key: 'vehicle_id',
        },
      },
      map_vehicle_seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'map_vehicle_seats',
          key: 'map_vehicle_seat_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Trip',
      tableName: 'trips',
      timestamps: false, 
    }
  );

  return trips;
};
