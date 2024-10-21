'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      employees.belongsTo(models.Office, { 
        foreignKey: 'office_id', 
        as: 'office', 
        onUpdate: 'CASCADE', 
        onDelete: 'RESTRICT' 
      });

      employees.belongsTo(models.EmployeeType, { 
        foreignKey: 'employee_type_id', 
        as: 'employeeType', 
        onUpdate: 'CASCADE', 
        onDelete: 'RESTRICT' 
      });
    }
  }

  employees.init(
    {
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_full_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      employee_email: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      employee_phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      employee_username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      employee_birthday: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isBefore: '2100-12-31',
          isAfter: '1900-01-01',
        },
      },
      employee_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      employee_profile_image: {
        type: DataTypes.TEXT,
      },
      employee_gender: {
        type: DataTypes.TINYINT,
        validate: {
          isIn: [[0, 1, -1]], 
        },
      },
      access_token: {
        type: DataTypes.TEXT,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
      last_refresh_token: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      is_first_activation: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        validate: {
          isIn: [[0, 1]],
        },
      },
      is_locked: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1]],
        },
      },
      last_lock_at: {
        type: DataTypes.DATE,
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
      office_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'offices',
          key: 'office_id',
        },
      },
      employee_type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employee_types',
          key: 'employee_type_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'employees', 
      tableName: 'employees',
      timestamps: false, 
    }
  );

  return employees;
};
