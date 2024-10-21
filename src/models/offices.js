'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offices extends Model {
    static associate(models) {
      // Định nghĩa quan hệ với bảng communes
      this.belongsTo(models.communes, {
        foreignKey: 'commune_id',
        as: 'commune', // Đặt tên alias cho quan hệ
      });
    }
  }

  Offices.init(
    {
      office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      office_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      office_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      office_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      office_fax: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      office_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      office_latitude: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      office_longitude: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      office_map_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_locked: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      last_lock_at: {
        type: DataTypes.DATE, 
        allowNull: true,
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
    },
    {
      sequelize,
      modelName: 'Offices',
      tableName: 'offices',
      timestamps: false,
    }
  );

  return Offices;
};