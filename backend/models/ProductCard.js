const mongoose = require('mongoose');

const pcardSchema = new mongoose.Schema({

    cardName:{
        type:String,
        required:true
    },
    cardNumber:{
        type:String,
        required:true,
    },
    month:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    cvv:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Pcards',pcardSchema);