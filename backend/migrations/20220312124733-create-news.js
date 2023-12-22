'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('news', {
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
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
          // references: {
          //     model: 'Users',
          //     key: 'user_id'
          // }
      },
      loc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //     model: 'Locations',
        //     key: 'loc_id'
        // }
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //     model: 'Locations',
        //     key: 'loc_id'
        // }
      },
      images: {
          type: DataTypes.STRING(1000),
          allowNull: true,
      },
      videos: {
          type: DataTypes.STRING(1000),
          allowNull: true,
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('news');
  }
};