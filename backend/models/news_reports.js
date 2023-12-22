'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News_Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.News, {
        foreignKey: 'news_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Reports, {
        foreignKey: 'rep_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  News_Reports.init({
    news_id: DataTypes.INTEGER,
    rep_id: DataTypes.INTEGER,
    reportCount: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'news_reports',
    modelName: 'News_Reports',
  });
  return News_Reports;
};