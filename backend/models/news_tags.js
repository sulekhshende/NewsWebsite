'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News_Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      this.belongsTo(models.News, {
          foreignKey: 'news_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      });
      this.belongsTo(models.Tags, {
        foreignKey: 'tag_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  News_Tags.init({
    news_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'news_tags',
    modelName: 'News_Tags',
  });
  return News_Tags;
};