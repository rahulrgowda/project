const mongoose=require('mongoose');

const User=mongoose.Schema({
    name:{
        type: String,
        required:true 
    },
    emailId:{
        type:String,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{ versionKey: false }
);

module.exports = mongoose.model('user',User)