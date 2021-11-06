require('express-async-errors');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const debug = require('debug')("app:main");
const config = require('config');
const winston = require('winston');

const router = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose
  .connect(config.get('db.address'))
  .then(() => debug("connected to mongodb"))
  .catch(() => debug("could not connect"));

process.on('uncaughtException', (ex)=>{
  console.log('uncaught exception');
  winston.error(ex.message,ex);
  process.exit(1);
});

process.on('unhandledRejection', (ex)=>{
  console.log('unhandleRejection');
  winston.error(ex.message,ex);
  process.exit(1);
});

winston.add(new winston.transports.File({filename: 'logfile.log'}));

// const p = Promise.reject(new Error('something failed outside promise'));

// p.then(()=> console.log('done'));

// throw new Error('something failed outside');

app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));