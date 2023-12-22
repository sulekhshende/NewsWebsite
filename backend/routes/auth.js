const router = require("express").Router();
const { sequelize, User } = require("../models");
//const { verifyEmail } = require('../src/verify')
const CryptoJs = require("crypto-js");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cookie = require('cookie-parser');
const dotenv = require("dotenv");
const { verifyTokenAndReporter, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../src/verifyRole");
const { verifyEmail } = require("../src/verify");
dotenv.config();

//Register
router.post("/register", async (req,res) => {
    console.log(req + " it is entering here")
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        isReporter: req.body.isReporter,
        emailToken: crypto.randomBytes(64).toString('hex'),
        rep_approval: req.body.rep_approval,
        city: req.body.city,
        password: CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    });
    
    try {
        console.log("registered user : " + newUser)
        let savedUser = await newUser.save();
        
        let decryptedPassword = CryptoJs.AES.decrypt(
            newUser.password,
            process.env.PASS_SEC
        );
        //console.log("decrypted password line no : 39 : " + decryptedPassword.toString(CryptoJs.enc.Utf8));
        let originalPassword = decryptedPassword.toString(CryptoJs.enc.Utf8)
        
        let emailOptions = {
            from: `"verify your email"<${newUser.email}>`,
            to: `${process.env.ADMIN_EMAIL}`,
            subject: 'Request for Job',
            html: ` <h2>Hello Admin, 
                        My Name is ${newUser.username}! I want to apply for Job</h2>
                    <h4>Please,can you appoint me as reporter</h4>`
        }
        
        // //email sender
        let transporter = nodemailer.createTransport({
            port: '465',
            secure: 'true',
            service: 'gmail',
            auth:{
                user:`${newUser.email}`,
                pass:`${originalPassword}`
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        //sending mail
        transporter.sendMail(emailOptions, (err, info) => {
            if(err){
                console.log(err);
            }
            else {
                console.log("email is sent to admin's gmail")
            }
        });
        

        
        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//Admin Approval Mail
router.post("/approval/:id",  verifyTokenAndAdmin,async (req,res) => {
    
    try {
        const newReporter = await User.findOne({ where:{ id: req.params.id} })
        newReporter.rep_approval = true;
        newReporter.isReporter = true;
        console.log("line 92 : " + "NEwsReporter details " + "username : " + newReporter.username + " email : " + newReporter.email + " isReporter : " + newReporter.isReporter + " rep_approval : " + newReporter.rep_approval)
        let savedReporter = await newReporter.save();
        const emailOption = {
            from: `"verify your email"<${process.env.ADMIN_EMAIL}>`,
            to: newReporter.email,
            subject: 'verify reporter mail',
            html: `<h2>${newReporter.username}! Thanks for Registering</h2>
                    <h4>Please Click On this Link To Login As a Reporter</h4>
                    <a href="http://localhost:7700/login">click Here</a>`
        }

        // //email sender
        let transporterMail = nodemailer.createTransport({
            port: '465',
            //secure: 'true',
            service: 'gmail',
            auth:{
                user:`${process.env.ADMIN_EMAIL}`,
                pass:`${process.env.ADMIN_PS}`
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        //sending mail
        transporterMail.sendMail(emailOption, (err, info) => {
            if(err){
                console.log(err);
            }
            else {
                console.log("email is sent to reporter's gmail")
            }
        });    
        
        res.status(201).json(savedReporter);
        
    } catch (err) {
        return res.status(500).json(err);
    }
});


//Admin Rejection Mail 
router.post("/rejection/:id",  verifyTokenAndAdmin,async (req,res) => {

    try {
        const reporterNew = await User.findOne({ where:{ id: req.params.id} })
        reporterNew.rep_approval = false;
        reporterNew.isReporter = false;
        console.log("line 92 : " + "NEwsReporter details " + "username : " + reporterNew.username + " email : " + reporterNew.email + " isReporter : " + reporterNew.isReporter + " rep_approval : " + reporterNew.rep_approval)
        let savedReporter = await reporterNew.save();
        const emailOpt = {
            from: `"verify your email"<${process.env.ADMIN_EMAIL}>`,
            to: reporterNew.email,
            subject: 'Rejection reporter mail',
            html: `<h2>${reporterNew.username}! Sorry</h2>
                    <h4>We don't have vacancies for now</h4>`
        }

        // //email sender
        let transport = nodemailer.createTransport({
            port: '465',
            //secure: 'true',
            service: 'gmail',
            auth:{
                user:`${process.env.ADMIN_EMAIL}`,
                pass:`${process.env.ADMIN_PS}`
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        //sending mail
        transport.sendMail(emailOpt, (err, info) => {
            if(err){
                console.log(err);
            }
            else {
                console.log("email is sent to reporter's gmail")
            }
        });    
        
        res.status(201).json(savedReporter);
        
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post("/login",  async(req, res) => {
    try {
        const user = await User.findOne({ where:{ username: req.body.username, rep_approval: true} })
        !user && res.status(401).json("Incorrect username!");
        console.log("This is UserId" +user.id);
        const hashedPassword = CryptoJs.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

        originalPassword !== req.body.password && 
            res.status(401).json("Wrong Password!");

        const accessToken = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin,
            isReporter: user.isReporter
        },
        process.env.JWT_SEC,
              {expiresIn: "1d"}
        );
        
        const { password, ...others } = user.dataValues;

        return res.status(200).json({...others, accessToken});
        //console.log(accessToken);
        // const token = createToken(user.id);
        // console.log(token);
        // //store token 
        // res.cookie('access-token', token);   

    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;