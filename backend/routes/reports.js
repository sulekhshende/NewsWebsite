const router = require("express").Router();
const { sequelize, User, News, Locations, Category, Tags, Reports } = require("../models");
//const category = require("../models/category");
const { authIsReporter } = require("../src/verify");
const { QueryTypes } = require('sequelize');
const { verifyTokenAndReporter, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../src/verifyRole");


//Post Report
router.post("/", async (req, res) => {
  
    const report = new Reports(req.body);
    try {
        const savedReport = await report.save();
        res.status(200).json(savedReport)
    } catch (err) {
        res.status(500).json(err); 
    }
  
});

//Get Report By Id 
router.get("/:id", async (req, res) => {
    try{
        const reportById = await Reports.findOne({ 
          where:{ id: req.params.id},
          //include: [News],
          //include: [Locations] 
        })
        res.status(200).json(reportById);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL Reports
router.get("/", async (req, res) => {
  try {
      const reports = await sequelize.query('Select * from reports', {
        type: QueryTypes.SELECT,
        model: Reports,
        mapToModel: News
      });
      res.status(200).json(reports);
  } catch (err) {
     res.status(500).json(err);
  }
});

//Get News with Reports By Id
router.get("/reportsNews/:id", async (req,res) => {
  try {
      const reportsNewsById = await Reports.findOne({
        include: [{
          required: true,
          model: News,
        }],
        where:{ id: req.params.id},
      });
      res.status(200).json(reportsNewsById);
  } catch (err) {
      res.status(500).json(err)
  }
});


//Delete Report By Id
router.delete("/:id",  verifyTokenAndAdmin,async (req, res) => {
    try {
        const deleteReportByid = await Reports.destroy({
          where: {rep_id: req.params.id}
        });
        //console.log(deleteReportByid)
        res.status(200).json(`Deleted Location Id : ${deleteReportByid}`);
    } catch (err) {
        res.send(500).json(err);
    }
});


module.exports = router;
