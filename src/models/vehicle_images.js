'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VehicleImages extends Model {
    static associate(models) {
      this.belongsTo(models.Vehicles, {
        foreignKey: 'vehicle_id',
        as: 'vehicle',
        onDelete: 'CASCADE',
      });
    }
  }

  VehicleImages.init(
    {
      vehicle_image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicle_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vehicle_image_description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      vehicle_image_type: {
        type: DataTypes.STRING(50),
        allowNull: true, // jpg, png, gif
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
      modelName: 'VehicleImages',
      tableName: 'vehicle_images',
      timestamps: false,
    }
  );

  return VehicleImages;
};
