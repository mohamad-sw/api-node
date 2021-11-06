const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoproject')
.then(()=> console.log('connected to mongodb'))
.catch((err)=> console.log('could not connect to mongodb'))