const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({

    productId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    itemPrice:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    rType:{
        type:String,
        required:true
    },
    rDetails:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    isPayment:{
        type:Boolean,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    isRefund:{
        type:Boolean,
        required:true
    },
    totalAmount:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Checkouts',checkoutSchema);
