const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoproject')
.then(()=> console.log('connected to mongodb'))
.catch((err)=> console.log('could not connect to mongodb'));

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: {type: String, required: true},
  favorites: [String],
  data: {type: Date, default: Date.now },
  admin: Boolean,
});
