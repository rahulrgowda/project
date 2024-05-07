const mongoose=require('mongoose');

const Booking=mongoose.Schema({
    userName:{
        type: String,
        required:true 
    },
    userEmailId:{
        type:String,
        required:true
    },
    bikeId:{
        type:String,
        required:true
    },
    bikeBooked:{
        type:String,
        required:true
    },
    pickUpLocationId:{
        type:String,
        required:true
    },
    pickUpLocation:{
        type:String,
        required:true
    },
    pickUpDate:{
        type:String,
        required:true
    },
    dropOffDate:{
        type:String,
        required:true
    },
    rideDuration:{
        type:Number,
        required:true
    },
    totalRideCost:{
        type:Number,
        required:true
    },
    bikePicUrl:{
        type:String,
        required:true
    }
},
{ versionKey: false }
);

module.exports = mongoose.model('booking',Booking)