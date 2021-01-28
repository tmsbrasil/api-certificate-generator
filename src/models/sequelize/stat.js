'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Stat.init({
    id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    certificate_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stat',
  });
  return Stat;
};