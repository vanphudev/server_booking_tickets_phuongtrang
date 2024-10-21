'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      // Một District thuộc về một Province
      this.belongsTo(models.Province, {
        foreignKey: 'province_id',
        as: 'province',
        onDelete: 'CASCADE', // Khi xóa Province, District cũng bị xóa
        onUpdate: 'CASCADE', // Cập nhật tự động nếu có thay đổi
      });
    }
  }

  District.init(
    {
      district_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      district_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      district_description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      district_grade: {
        type: DataTypes.STRING(255),
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
      province_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'District', 
      tableName: 'districts', 
      timestamps: false,
    }
  );

  return District;
};
