const router = require("express").Router();
const { sequelize, User, News, Locations, Category, Tags,Reports, News_Tags, News_Reports } = require("../models");
//const category = require("../models/category");
const { authIsReporter } = require("../src/verify");
const { QueryTypes, where, and } = require('sequelize');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../src/verifyRole");

//Get All Approved Users 
router.get("/",verifyTokenAndAdmin,async (req, res) => {
   
    try {
        const reporter = await sequelize.query('Select * from users where isAdmin = 0 and rep_approval = 1', {
          type: QueryTypes.SELECT,
          model: User,
        });
        res.status(200).json(reporter);
    } catch (err) {
       res.status(500).json(err);
    }
  });

module.exports = router;
