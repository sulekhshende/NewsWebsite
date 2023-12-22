const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const { sequelize, User } = require("../models");

const loginRequired = async (req, res, next) => {
    const token = req.cookies['access-token']
    try {
        if(token){
            const validatetoken = await jwt.verify(token, process.env.JWT_SECRET);
            if(validatetoken){
                res.user = validatetoken.id;
                next();
            }
            else {
                console.log('token expired');
                res.status(401).json("token expired");
            }
        }
        else {
            console.log('token not found');
            res.status(404).json("token not found");
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

const verifyEmail = async (req,res,next) => {
    try {
        const user = await User.findOne({ where:{ email: req.body.email} });
        if(user.rep_approval){
            next();
        }
        else {
            console.log("Please Check your email to verify")
        }
    } catch (error) {
        console.log(error)
    }
}

// const authIsReporter = async (req, res, next) => {
//     try {
//         const user = await User.findAll({ where: { isReporter: true }});
//         if(user){//req.params.id===user.id
//             //res.status(401);
//             //return res.status(401).json("You are not allowed to postnews");
//             //res.user_id = user.id;
//             next();
//         }
//         else {
//             res.send("You are not allowed to postnews");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// const authIsReporter = async (req, res, next) => {
//     //const user_id = req.body.user_id;
//     try {
//         const user = await User.findAll({ where: { isReporter: true }});
//         const id = user.id;
//         if(id){
//             req.body.user_id = User.find(user => user.user_id === id);
//             next();
//         }
//         else {
//             res.status(401).json("You are not allowed to postnews")
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// function setUser(req, res, next){
//     const user_id = req.body.user_id;
//     if(user_id){
//         req.user = User.find(user => user.user_id === user_id)
//         next();
//     }
//     else {
//         console.log("User doesn't exist")
//     }
// }

// function authIsReporter(role){
//     return (req, res, next) => {
//         if(req.user.isReporter !== role){
//             res.status(401);
//             return res.send("You are not allowed to Post News");
//         }
//         next();
//     }
// }


module.exports = { loginRequired, verifyEmail };