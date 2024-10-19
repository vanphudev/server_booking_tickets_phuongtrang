'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Route.init({
    route_name: DataTypes.STRING,
    route_duration: DataTypes.BIGINT,
    route_distance: DataTypes.BIGINT,
    route_url_gps: DataTypes.TEXT,
    origin_office_id: DataTypes.INTEGER,
    destination_office_id: DataTypes.INTEGER,
    route_price: DataTypes.DECIMAL,
    is_default: DataTypes.TINYINT,
    is_locked: DataTypes.TINYINT,
    last_lock_at: DataTypes.DATE,
    way_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};