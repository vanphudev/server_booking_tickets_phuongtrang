'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Routes extends Model {
    static associate(models) {
      // Định nghĩa quan hệ với bảng Offices
      routes.belongsTo(models.offices, {
        foreignKey: 'origin_office_id',
        as: 'originOffice',
      });
      Routes.belongsTo(models.offices, {
        foreignKey: 'destination_office_id',
        as: 'destinationOffice',
      });
      Routes.belongsTo(models.ways, {
        foreignKey: 'way_id',
        as: 'way',
      });
    }
  }

  Routes.init(
    {
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      route_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      route_duration: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isInt: true,
          min: 0, // Không được âm
        },
      },
      route_distance: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isInt: true,
          min: 0, // Không được âm
        },
      },
      route_url_gps: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      origin_office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'office_id',
        },
      },
      destination_office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'office_id',
        },
      },
      route_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: 0, // Không được âm
        },
      },
      is_default: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0, // Giá trị mặc định
      },
      is_locked: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0, // Giá trị mặc định
      },
      last_lock_at: {
        type: DataTypes.DATE,
        allowNull: false,
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
      way_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ways',
          key: 'way_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Routes',
      tableName: 'routes',
      timestamps: false,
    }
  );

  return Routes;
};
