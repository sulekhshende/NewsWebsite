'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        //as: 'user_idFk',
        foreignKey: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //     model: 'Users',
        //     key: 'user_id'
        // }
      });
      this.belongsTo(models.Locations, {
        //as: 'loc_idFk',
        foreignKey: 'loc_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //     model: 'Locations',
        //     key: 'loc_id'
        // }
      });
      this.belongsToMany(models.Tags, {
        through: 'News_Tags',
        //as: 'news',
        foreignKey: 'news_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsToMany(models.Reports, {
        through: 'News_Reports',
        //as: 'news',
        foreignKey: 'news_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Category, {
        as: 'newscategory',
        foreignKey: 'category_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  News.init({
    // news_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey :true
    // },
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      autoIncrement: true,
      primaryKey :true,
      field: 'news_id'
    },
    title : { 
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    information : { 
        type: DataTypes.STRING(7000),
        allowNull: false,
    },
    images: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    videos: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'news',
    modelName: 'News',
  });
  return News;
};