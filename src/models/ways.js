'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ways extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }

  Ways.init(
    {
      way_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      way_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      way_description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_locked: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0, // Mặc định là không khóa (0)
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
      modelName: 'Ways', 
      tableName: 'ways', 
      timestamps: false, 
    }
  );

  return Ways;
};
