const router = require("express").Router();
const { sequelize, User, News, Locations, Category, Tags,Reports, News_Tags, News_Reports } = require("../models");
//const category = require("../models/category");
const { authIsReporter } = require("../src/verify");
const { QueryTypes, where, and } = require('sequelize');
const { verifyTokenAndAuthorization } = require("../src/verifyRole");


//Post Newstags Ids
router.post("/",  async (req, res) => {
  
    const newReport = new News_Reports({
            news_id: req.body.news_id,
            rep_id: req.body.rep_id,
            reportCount: req.body.reportCount
            // include: [{
            //     model: User
            // }]
            
    });
    try {
        const savedNewsReport = await newReport.save();
        res.status(200).json(savedNewsReport)
    } catch (err) {
        res.status(500).json(err); 
    }
  
});

//Get Report News By Id 
router.get("/:id", async (req, res) => {
    try{
        const newsReports = await News_Reports.findAll({ 
          where:{ news_id: req.params.id},
          //include: [News],
          //include: [Reports]
          //include: [Locations] 
        })
        res.status(200).json(newsReports);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Update Unique Report News By Id 
router.put("/unique/:id", async (req, res) => {
    try{
        const newsReports = await News_Reports.findOne({ 
          where:{ news_id: req.params.id, rep_id: req.body.rep_id },
          //include: [News],
          //include: [Reports]
          //include: [Locations] 
        })
        const updatedCount = await newsReports.update({reportCount: req.body.reportCount});
        const newSavedUpdatedCount = await updatedCount.save();
        res.status(200).json(newSavedUpdatedCount);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Post ReportCount Ids
router.post("/count",  async (req, res) => {
    
    const newReport = await News_Reports.create({
            news_id: req.body.news_id,
            rep_id: req.body.rep_id,
            
            // include: [{
            //     model: User
            // }]
            
    });
    await newReport.update({reportCount: 1})
    try {
        const savedNewsReport = await newReport.save();
        res.status(200).json(savedNewsReport)
    } catch (err) {
        res.status(500).json(err); 
    }
  
});


//Get All News
router.get("/", async (req, res) => {
    try {
        const news = await sequelize.query('Select * from news', {
          type: QueryTypes.SELECT,
          model: News,
          mapToModel: User
        });
        res.status(200).json(news);
    } catch (err) {
       res.status(500).json(err);
    }
  });
  

module.exports = router;
