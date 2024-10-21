'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pickup_points extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      pickup_points.belongsTo(models.Office, {
        foreignKey: 'pickup_point_office_id',
        as: 'office',
      });
    }
  }

  pickup_points.init(
    {
      pickup_point_way_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      pickup_point_office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'id',
        },
      },
      pickup_point_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      pickup_point_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      pickup_point_kind: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      pickup_point_description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      point_kind_name: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    },
    {
      sequelize,
      modelName: 'pickup_points',
      tableName: 'pickup_points', 
      timestamps: false, 
    }
  );

  return pickup_points;
};
