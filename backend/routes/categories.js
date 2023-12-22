const router = require("express").Router();
const { sequelize, User, News, Locations, Category } = require("../models");
//const category = require("../models/category");
const { authIsReporter } = require("../src/verify");
const { QueryTypes } = require('sequelize');
const { verifyTokenAndReporter, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../src/verifyRole");


//CREATE NEW CATEGORY
router.post("/" , verifyTokenAndAuthorization,async (req, res) => {
  
    const userNewsCategory = new Category({
            category_name: req.body.category_name,
    });
    try {
        const savedNewsCategory = await userNewsCategory.save();
        res.status(200).json(savedNewsCategory)
    } catch (err) {
        res.status(500).json(err); 
    }
  
});

//Get Category With News By Id 
router.get("/:id", async (req, res) => {
  try{
      const category = await Category.findOne({ 
        include: [{
          required: true,
          model:News
        }],
        where:{ id: req.params.id},
      });
      res.status(200).json(category);
  } catch (err) {
      res.status(500).json(err);
  }
});


//GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
      const news = await sequelize.query('Select * from category', {
        type: QueryTypes.SELECT,
        model: Category,
        mapToModel: News
      });
      res.status(200).json(news);
  } catch (err) {
     res.status(500).json(err);
  }
});

//Delete Category By Id
router.delete("/:id",  verifyTokenAndAuthorization,async (req, res) => {
  try {
      const deleteCategoryById = await Category.destroy({
        where: {category_id: req.params.id}
      });
      //console.log(deleteCategoryById)
      res.status(200).json(`Deleted Category Id : ${deleteCategoryById}`);
  } catch (err) {
      res.send(500).json(err);
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
//                 in: [catName],
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
