'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.News, {
        //as: 'categorynews',
        foreignKey: 'category_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //     model: 'Users',
        //     key: 'user_id'
        // }
      });
      
    }
  }
  Category.init({
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      autoIncrement: true,
      primaryKey :true,
      field: 'category_id'
    },
    category_name: DataTypes.STRING,
    viewCount: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: 'category',
    modelName: 'Category',
  });
  return Category;
};