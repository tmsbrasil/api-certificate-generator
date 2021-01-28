'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Certificate.init({
    id: DataTypes.INTEGER,
    file: DataTypes.STRING,
    participant_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    downloads: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Certificate',
  });
  return Certificate;
};