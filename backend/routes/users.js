const router = require("express").Router();
const { sequelize, User, News } = require("../models");
const { authIsReporter } = require("../src/verify");
//const News = require("../models/News");
const { QueryTypes } = require('sequelize');
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../src/verifyRole");




//Get Particular User
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findOne({ where:{ id: req.params.id} })
        const { password, ...others } = user.dataValues;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Get All Waiting Users 
router.get("/",verifyTokenAndAdmin,async (req, res) => {
    try {
        const users = await sequelize.query('Select * from users where isAdmin = 0 and rep_approval=0', {
          type: QueryTypes.SELECT,
          model: User,
          mapToModel: News
        });
        res.status(200).json(users);
    } catch (err) {
       res.status(500).json(err);
    }
  });  

//Delete User By Id
router.delete("/:id",verifyTokenAndAdmin,  async (req, res) => {
    try {
        const deleteUserById = await User.destroy({
          where: {user_id: req.params.id}
        });
        //console.log(deleteNewsById)
        res.status(200).json(`Deleted User Id : ${deleteUserById}`);
    } catch (err) {
        res.send(500).json(err);
    }
})
 
 //Reporter Posting News 
router.post("/:id", verifyTokenAndAuthorization , async (req, res) => {
  
    const userNews = new News({
            title: req.body.title,
            information: req.body.information,
            user_id : req.params.id
    });
    try {
        const savedNews = await userNews.save();
        res.status(200).json(savedNews)
    } catch (err) {
        res.status(500).json(err); 
    }
  
});

//Get Reporter's News 
router.get("/userNews/:id", async (req, res) => {
    try{
        const userNews = await User.findOne({
          required:true,
          include: 
          [{
            required: true,
            model:News,
            attributes: ['title']
          }],
          where:{ id: req.params.id},
        });
        
        res.status(200).json(userNews);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
