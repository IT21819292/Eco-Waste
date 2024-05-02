const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pickUpDate:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isApprove:{
        type:Boolean,
        required:true
    },
    paymentSlip:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('Requests',requestSchema);