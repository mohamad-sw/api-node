const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const {isLoggined} = require('./../middlewares/auth')

router.use('/auth', authRouter);

router.use('/user', isLoggined, userRouter);

module.exports = router;