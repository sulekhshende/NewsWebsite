'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.News, {
        through: 'News_Reports',
        //as: 'news',
        foreignKey: 'rep_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Reports.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(255),
      field: 'rep_id'
    },
    rep_name: {
      type: DataTypes.STRING(50),
      unique: true
    }  
  }, {
    sequelize,
    tableName: 'reports',//database table name
    modelName: 'Reports',//modelname
  });
  return Reports;
};