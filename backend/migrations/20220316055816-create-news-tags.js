'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('News_Tags', {
      id: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
        autoIncrement: true,
        primaryKey :true,
      },
      news_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //   model: 'News',
        //   key: 'news_id'
        // },
        // field: 'news_id'
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //   model: 'Tags',
        //   key: 'tag_id'
        // },
        // field: 'tag_id'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('News_Tags');
  }
};