const router = require("express").Router();
const { sequelize, User, News, Locations, Category, Tags } = require("../models");
//const category = require("../models/category");
const { authIsReporter } = require("../src/verify");
const { QueryTypes } = require('sequelize');
const { verifyTokenAndReporter, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../src/verifyRole");


//Post Tags
router.post("/" , verifyTokenAndAuthorization,async (req, res) => {
  
    const newTag = new Tags({
            tag_name: req.body.tag_name,
            category_id: req.body.category_id,
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

//Get Tags With Category BY Id
router.get("/:id", async (req, res) => {
    try{
        const tags = await Tags.findOne({ 
          where:{ id: req.params.id},
          include: [Category],
          //include: [Locations] 
        })
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL TAGS

router.get("/", async (req, res) => {
  try {
      const tags = await sequelize.query('Select * from tags', {
        type: QueryTypes.SELECT,
        model: Tags,
        mapToModel: Category,
        include: [Category],
      });
      res.status(200).json(tags);
  } catch (err) {
     res.status(500).json(err);
  }
});

//Get News with Tags
router.get("/tagsNews/:id", async (req,res) => {
  try {
      const tagsNews = await Tags.findOne({
        include: [{
          required: true,
          model: News,
        }],
        where:{ id: req.params.id},
      });
      res.status(200).json(tagsNews);
  } catch (err) {
      res.status(500).json(err)
  }
});

//Delete Tag By Id
router.delete("/:id",  verifyTokenAndAuthorization,async (req, res) => {
  try {
      const deleteTagById = await Tags.destroy({
        where: {tag_id: req.params.id}
      });
      //console.log(deleteTagById)
      res.status(200).json(`Deleted Tag Id : ${deleteTagById}`);
  } catch (err) {
      res.send(500).json(err);
  }
});


module.exports = router;
