'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OfficeImages extends Model {
    static associate(models) {
      // Định nghĩa quan hệ với offices
      this.belongsTo(models.Offices, {
        foreignKey: 'office_id',
        as: 'office',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  OfficeImages.init(
    {
      office_image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      office_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      office_image_description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      office_image_type: {
        type: DataTypes.STRING(50),
        allowNull: true, // Ví dụ: jpg, png
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'office_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'OfficeImages',
      tableName: 'office_images',
      timestamps: false,
    }
  );

  return OfficeImages;
};
