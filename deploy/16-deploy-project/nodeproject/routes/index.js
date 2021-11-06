const express = require("express");
const router = express.Router();

const homeController =  require('controllers/homeController');



router.use('/user' , require('./user'))
router.use('/auth' , require('./auth'))
router.use('/dashboard' , require('./dashboard'))
router.get('/paycallback' , homeController.paycallback)

router.get('/logout' , (req,res)=>{
    req.logout();
    res.redirect('/');
})


router.all('*' , async (req,res,next)=>{
    try{
        let err = new Error('چنین صفحه ای یافت نشد ');
        err.status = 404;
        throw err;
    }catch(err){
        next(err);
    }
});

router.use( (err,req,res,next)=>{
    const code = err.status || 500 ;
    const message = err.message || "";
    const stack = err.stack || "";

    if(config.debug){
        return res.render('errors/developer' , {message , stack})
    }else{
        return res.render(`errors/${code}` , {message});
    }
})




module.exports = router;