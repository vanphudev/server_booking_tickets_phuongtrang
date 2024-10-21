'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      // Một Province có nhiều Districts
      this.hasMany(models.District, {
        foreignKey: 'province_id',
        as: 'districts',
        onDelete: 'CASCADE', // Khi xóa Province, District cũng bị xóa
        onUpdate: 'CASCADE', // Cập nhật tự động nếu có thay đổi
      });
    }
  }

  Province.init(
    {
      province_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      province_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      province_grade: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      province_description: {
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
      modelName: 'Province', 
      tableName: 'provinces', 
      timestamps: false,
    }
  );

  return Province;
};
