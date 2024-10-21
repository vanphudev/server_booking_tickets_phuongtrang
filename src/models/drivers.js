'use strict';
const { Model, DataTypes } = require('sequelize');

class drivers extends Model {
  static associate(models) {
   
    drivers.belongsTo(models.employees, {
      foreignKey: 'employee_id',
      as: 'employee',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

drivers.init(
  {
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    driver_license_number: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    driver_experience_years: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      onUpdate: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'employees',
        key: 'employee_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  },
  {
    sequelize,
    modelName: 'drivers',
    tableName: 'drivers',
    timestamps: false, 
  }
);

module.exports = drivers;
