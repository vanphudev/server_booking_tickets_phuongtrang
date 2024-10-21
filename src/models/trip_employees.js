'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class trip_employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   
      trip_employees.belongsTo(models.Trip, {
        foreignKey: 'trip_id',
        as: 'trip',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

     
      trip_employees.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  trip_employees.init(
    {
      trip_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'trips',
          key: 'trip_id',
        },
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'employees',
          key: 'employee_id',
        },
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
    },
    {
      sequelize,
      modelName: 'TripEmployee',
      tableName: 'trip_employees',
      timestamps: false, 
    }
  );

  return trip_employees;
};
