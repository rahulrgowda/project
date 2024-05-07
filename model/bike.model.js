const mongoose=require('mongoose');

const Bike=mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    locationId:{
        type:String,
        required:true
    },
    locationTitle:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
},
{ versionKey: false }
);

module.exports = mongoose.model('bike',Bike)