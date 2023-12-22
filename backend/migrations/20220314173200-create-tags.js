'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(255),
        field: 'tag_id'
      },
      tag_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      category_id: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        // references: {
        //     model: 'Users',
        //     key: 'user_id'
        // }
      },
      isSelectedTag: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('tags');
  }
};

