const express = require("express");
const router = express.Router();

//controllers
const authController =  require('controllers/authController');

//validators
const authValidator = require('validators/authValidator');

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    next();
})

router.get("/login",  authController.loginForm );
router.get("/register",  authController.registerForm );


router.post("/login", authValidator.login(), authController.login );
router.post("/register",authValidator.register(),  authController.register );



module.exports = router;
