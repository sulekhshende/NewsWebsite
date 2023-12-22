'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.News, {
          foreignKey: 'loc_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      });
    }
  }
  Locations.init({
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      autoIncrement: true,
      primaryKey :true,
      field: 'loc_id'
    },
    loc_name: {
      type: DataTypes.STRING,
      unique: true
    }  
  }, {
    sequelize,
    tableName: 'locations',
    modelName: 'Locations',
  });
  return Locations;
};