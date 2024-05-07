const mongoose=require('mongoose');

const Feedback=mongoose.Schema({
    name:{
        type: String,
        required:true 
    },
    emailId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},
{ versionKey: false }
);

module.exports = mongoose.model('feedback',Feedback)