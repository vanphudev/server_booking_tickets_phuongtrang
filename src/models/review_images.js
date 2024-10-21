'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class review_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      review_images.belongsTo(models.Review, {
        foreignKey: 'review_id',
        as: 'review',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  review_images.init(
    {
      review_image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'reviews',
          key: 'review_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      review_image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      review_image_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
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
        onUpdate: sequelize.fn('NOW'),
      },
    },
    {
      sequelize,
      modelName: 'review_images', 
      tableName: 'review_images',
      timestamps: false, 
    }
  );

  return review_images;
};
