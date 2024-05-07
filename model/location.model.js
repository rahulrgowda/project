const mongoose=require('mongoose');

const Location=mongoose.Schema({
    locationId:{
        type: String,
        required:true 
    },
    locationName:{
        type:String,
        required:true
    }
},
{ versionKey: false }
);

module.exports = mongoose.model('location',Location)