const express = require('express');
const app = express();
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session)
require('app-module-path').addPath(__dirname);
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/nodestart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    "auth": { "authSource": "admin" },
    "user": "neonlearnir",
    "pass": "neonlearnir",
});

global.config = require('./config');

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended : false}));
app.set('view engine' , 'ejs') ;
app.use(methodOverride('method'));

app.use(cookieParser(process.env.COOKIE_SECRET)) ;

app.use(session({
    secret: process.env.SESSION_SECRET ,
    resave: true ,
    saveUninitialized: true,
    cookie : {expires : new Date( Date.now() + 1000 * 3600 *24 * 100) },
    store : new MongoStore({mongooseConnection : mongoose.connection })
  }))



app.use(flash());

require('./passport/passport-local');
app.use(passport.initialize())
app.use(passport.session())



app.use((req,res,next)=>{
    res.locals = {errors: req.flash("errors"), req};
    next();
})
app.get('/', (req,res)=>{
    res.render('index');
})


app.use('/' , require('./routes/index'));

app.listen( config.port , ()=>{
    console.log(`server is running on port ${config.port}`);
})