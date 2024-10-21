'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // Một khách hàng thuộc về một loại khách hàng
      this.belongsTo(models.CustomerType, {
        foreignKey: 'customer_type_id',
        as: 'customerType', 
      });
    }
  }

  Customer.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      customer_full_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      customer_phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      customer_email: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      customer_gender: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      customer_birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      customer_avatar_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      customer_destination_address: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      customer_password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      is_disabled: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      last_login_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_refresh_token: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.TINYINT,
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
      customer_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customer_types', 
          key: 'customer_type_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Customer', 
      tableName: 'customers',
      timestamps: false,
    }
  );

  return Customer;
};
