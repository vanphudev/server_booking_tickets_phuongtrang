'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CustomerType extends Model {
    static associate(models) {
      // Một loại khách hàng có nhiều khách hàng
      this.hasMany(models.Customer, {
        foreignKey: 'customer_type_id',
        as: 'customers', 
      });
    }
  }

  CustomerType.init(
    {
      customer_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      customer_type_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      customer_type_description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'CustomerType', 
      tableName: 'customer_types',
      timestamps: false,
    }
  );

  return CustomerType;
};
