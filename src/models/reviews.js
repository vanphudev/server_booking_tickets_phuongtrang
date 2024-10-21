'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      reviews.belongsTo(models.Route, {
        foreignKey: 'route_id',
        as: 'route',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

     
      reviews.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
        as: 'customer',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  reviews.init(
    {
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      review_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      review_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn('NOW'),
      },
      review_comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_locked: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      last_lock_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'routes',
          key: 'route_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'customer_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'reviews', 
      tableName: 'reviews',
      timestamps: false, 
    }
  );

  return reviews;
};
