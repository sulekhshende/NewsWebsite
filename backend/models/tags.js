'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
    //   // define association here
      this.belongsTo(models.Category, {
        //as: 'user_idFk',
        foreignKey: 'category_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //     model: 'Users',
        //     key: 'user_id'
        // }
      });
      this.belongsToMany(models.News, {
        //as: 'tagsnews',
        through: 'News_Tags',
        foreignKey: 'tag_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Tags.init({
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
        autoIncrement: true,
        primaryKey :true,
        field: 'tag_id'
    },
    tag_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    isSelectedTag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }  
  }, {
    sequelize,
    tableName: 'tags',
    modelName: 'Tags',
  });
  return Tags;
};