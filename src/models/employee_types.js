'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class employee_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Định nghĩa quan hệ nếu cần, ví dụ:
      // employee_types.hasMany(models.Employee, { foreignKey: 'employee_type_id', as: 'employees' });
    }
  }

  employee_types.init(
    {
      employee_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_type_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      employee_type_description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
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
      modelName: 'employee_types',
      tableName: 'employee_types', 
      timestamps: false, 
    }
  );

  return employee_types;
};
