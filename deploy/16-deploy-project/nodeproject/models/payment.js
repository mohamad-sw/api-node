const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'} ,
    resnumber : {type : String , required : true } ,
    amount : {type : Number , required : true} ,
    payment : {type : Boolean , default : false }
});

module.exports = mongoose.model("Payment", userSchema , "Payment") ;
