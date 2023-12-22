const router = require("express").Router();
const { sequelize, User, News, Locations } = require("../models");
const category = require("../models/category");
const { authIsReporter } = require("../src/verify");
const { QueryTypes } = require('sequelize');
const { verifyTokenAndReporter, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../src/verifyRole");


//Post New Location
router.post("/"  , verifyTokenAndAuthorization,async (req, res) => {
    
    const newsLocation = new Locations(req.body);
    try {
        const savedNewsLocation = await newsLocation.save();
        res.status(200).json(savedNewsLocation)
    } catch (err) {
        res.status(500).json(err); 
    }
  
});

//Get Location By id With News
router.get("/:id", async (req, res) => {
    try{
        const newsLocation = await Locations.findOne({ 
          where:{ id: req.params.id},
          include: [News],
        })
        res.status(200).json(newsLocation);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL LOCATIONS
router.get("/", async (req, res) => {
  try {
      const news = await sequelize.query('Select * from locations', {
        type: QueryTypes.SELECT,
        model: Locations,
        mapToModel: News
      });
      res.status(200).json(news);
  } catch (err) {
     res.status(500).json(err);
  }
});


//Delete Location By Id
router.delete("/:id",  verifyTokenAndAuthorization,async (req, res) => {
    try {
        const deleteLocationByid = await Locations.destroy({
          where: {loc_id: req.params.id}
        });
        //console.log(deleteLocationByid)
        res.status(200).json(`Deleted Location Id : ${deleteLocationByid}`);
    } catch (err) {
        res.send(500).json(err);
    }
});

  

module.exports = router;
