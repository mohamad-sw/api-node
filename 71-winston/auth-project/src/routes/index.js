const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const adminRouter = require('./admin');
const {isLoggined , isAdmin} = require('./../middlewares/auth')
const error = require('./../middlewares/error');

router.use('/auth', authRouter);

router.use('/user', isLoggined, userRouter);
router.use('/admin', isLoggined, isAdmin, adminRouter);

router.use(error);

module.exports = router;