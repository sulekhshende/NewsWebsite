const router = require("express").Router();
const { sequelize, User, News, Locations, Category,Tags, Reports } = require("../models");
const { QueryTypes } = require('sequelize');
const { verifyTokenAndReporter, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../src/verifyRole");


//Post News
router.post("/", verifyTokenAndReporter,async (req, res) => {
  
    const userNews = new News({
            title: req.body.title,
            information: req.body.information,
            images: req.body.images,
            videos: req.body.videos,
            user_id: req.body.user_id,
            loc_id: req.body.loc_id,
            category_id: req.body.category_id
    });
    try {
        
        const savedNews = await userNews.save();
        res.status(200).json(savedNews)
    } catch (err) {
      console.log("this is that error")
        res.status(500).json(err); 
    }
  
});

//Get News By Id
router.get("/:id", async (req, res) => {
    try{
        const news = await News.findOne({ 
          include: [{
            required: true,
            model:User
          }],
          include: [{
            required: true,
            model:Locations,
            attributes: ['loc_name']
          }],
          // include: [{
          //   required: true,
          //   model: Reports
          // }],
          where:{ id: req.params.id},
        });
        res.status(200).json(news);
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

//Get News with Tags
router.get("/newsTags/:id", async (req,res) => {
    try {
        const newsTags = await News.findOne({
          include: [{
            required: true,
            model: Tags,
            attributes: ['tag_name']
          }],
          where:{ id: req.params.id},
        });
        res.status(200).json(newsTags);
    } catch (err) {
        res.status(500).json(err)
    }
});


//Delete Reported News By Id and Delete News by Id
router.delete("/:id",  verifyTokenAndAdmin,async (req, res) => {
  try {
      const deleteNewsById = await News.destroy({
        where: {news_id: req.params.id}
      });
      res.status(200).json(`Deleted News Id : ${deleteNewsById}`);
  } catch (err) {
      res.send(500).json(err);
  }
});


// get published news wrt reporter id
router.get("/published/:id" ,verifyTokenAndReporter, async (req, res) => {
  try{
      const news = await News.findAll({
        include: [{
          required: true,
          model:User
        }],
        include: [{
          required: true,
          model:Locations,
          attributes: ['loc_name']
        }],
        where:{ user_id: req.params.id},
      });
      res.status(200).json(news);
  } catch (err) {
      res.status(500).json(err);
  }
});
//Get All News
// router.get("/", async (req, res) => {
//     const user_id = req.decoded.data;
//     const catName = req.decoded.data;
//     try {
//       let news;
//       if (user_id) {
//         news = await News.findAll({ user_id: req.body.id });
//       } else if (catName) {
//         news = await news.findAll({
//           include: [{
//             category: {
//                 attribute: [category_Name],
//               },
//           }]  
//         });
//       } else {
//         news = await news.find();
//       }
//       res.status(200).json(news);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  

module.exports = router;
