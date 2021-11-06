const express = require("express");
const router = express.Router();

//controllers
const dashboardController =  require('controllers/dashboardController');
const editUserValidator = require('validators/editUserValidator');
const uploadUserProfile = require('upload/uploadUserProfile');

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
})

router.get("/",  dashboardController.index );
router.post("/pay",  dashboardController.pay );

router.post("/edituser", uploadUserProfile.single('img') , (req,res,next)=>{
    if(!req.file){
        req.body.img = null
    }else{
        req.body.img = req.file.filename;
    }
    next()
} ,  editUserValidator.handle() , dashboardController.edituser );





module.exports = router;
