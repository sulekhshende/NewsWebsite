// const Sequelize = require("sequelize");
// const sequelize = require("../src/connection");
const {Model} =require('sequelize');

// module.exports = sequelize.define("User", {
//     id: {
//         type: Sequelize.INTEGER(11),
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey :true
//     },
//     username : { 
//         type: Sequelize.STRING(300),
//         allowNull: false,
//         unique: true,
//     },
//     email : { 
//         type: Sequelize.STRING(300),
//         allowNull: false,
//         unique: true,
//     },
//     isAdmin: {
//         type: Sequelize.BOOLEAN, 
//         default: false,
//     },
//     isReporter: {
//         type: Sequelize.BOOLEAN, 
//         default: false,
//     },
//     rep_approval: {
//         type : Sequelize.BOOLEAN,
//         default: false
//     }
// })

module.exports = (sequelize,DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.News, {
                foreignKey: 'user_id',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            })
        }
    };
    
User.init({
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
    }    
   } , {   
       sequelize,
       tableName: 'users',
       modelName : 'User',
});

return User;

};

