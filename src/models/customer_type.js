'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer_type.init({
    customer_type_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer_type',
  });
  return customer_type;
};