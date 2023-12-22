const router = require("express").Router();
const { sequelize, User, News, Locations, Category, Tags,Reports, News_Tags, News_Reports } = require("../models");
const { authIsReporter } = require("../src/verify");
const { QueryTypes, where, and } = require('sequelize');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../src/verifyRole");




//GET ALL Reports
router.get("/", verifyTokenAndAdmin,async (req, res) => {
    try {
        const reports = await sequelize.query('Select distinct news_id and rep_id from news_reports', {
          type: QueryTypes.SELECT,
          model: Reports,
          mapToModel: News
        });
        res.status(200).json(reports);
    } catch (err) {
       res.status(500).json(err);
    }
  });

//Get All Reported News
router.get("/reportedNews", verifyTokenAndAdmin,async (req, res) => {
    try{
        const news = await News.findAll({ 
           include: [{
            required: true,
            model: Reports
          }],
        });
        res.status(200).json(news);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Reported News By Id
router.get("/reportedNewsById/:id", verifyTokenAndAdmin,async (req, res) => {
    try{
        const news = await News.findOne({ 
            include: [{
            required: true,
            model: Reports
          }],
        where :{ news_id : req.params.id}  
        });
        res.status(200).json(news);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;