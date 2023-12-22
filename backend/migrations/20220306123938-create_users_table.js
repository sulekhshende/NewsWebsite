'use strict';

module.exports = {
  up : async (queryInterface, DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
        autoIncrement: true,
        primaryKey :true,
        field: 'user_id'
      },
      username : { 
          type: DataTypes.STRING(300),
          allowNull: false,
          unique: true,
      },
      email : { 
          type: DataTypes.STRING(300),
          allowNull: false,
          unique: true,
      },
      emailToken : { 
          type: DataTypes.STRING(300),
      },
      password : {
          type: DataTypes.STRING(300),
          allowNull: false,
      },
      city: {
        type : DataTypes.STRING(300),
        allowNull: false,
      },
      isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      isReporter: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      rep_approval: {
          type : DataTypes.BOOLEAN,
          defaultValue: false,
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

  down : async (queryInterface, DataTypes) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('users');
  }
};
