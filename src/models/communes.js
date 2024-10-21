'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Communes extends Model {
    static associate(models) {
      this.belongsTo(models.Districts, {
        foreignKey: 'district_id',
        as: 'district',
        onDelete: 'CASCADE',
      });
    }
  }

  Communes.init(
    {
      commune_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      commune_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      commune_description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      commune_grade: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
      },
    },
    {
      sequelize,
      modelName: 'Communes',
      tableName: 'communes',
      timestamps: false,
    }
  );

  return Communes;
};
