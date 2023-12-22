const router = require("express").Router();
const { sequelize, User, News, Locations, Category, Tags, News_Tags } = require("../models");
//const category = require("../models/category");
const { authIsReporter } = require("../src/verify");
const { QueryTypes } = require('sequelize');
const { verifyTokenAndAuthorization } = require("../src/verifyRole");


//Post Newstags Ids
router.post("/",async (req, res) => {
  
    const newTag = new News_Tags({
            news_id: req.body.news_id,
            tag_id: req.body.tag_id
            
            // include: [{
            //     model: User
            // }]
            
    });
    try {
        
        const savedNewTag = await newTag.save();
        res.status(200).json(savedNewTag)
    } catch (err) {
        res.status(500).json(err); 
    }
  
});

//Get Tags 
router.get("/:id", async (req, res) => {
    try{
        const newsTags = await News_Tags.findOne({ 
          where:{ news_id: req.params.id},
          include: [News],
          include: [Tags]
          //include: [Locations] 
        })
        res.status(200).json(newsTags);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Tags News By Id
router.get("/tagsNewsById/:id", async (req, res) => {
    try{
        const newstags = await News.findOne({ 
            include: [{
            required: true,
            model: Tags
          }],
        where :{ news_id : req.params.id}  
        });
        res.status(200).json(newstags);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
