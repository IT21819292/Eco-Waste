const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const maintenanceFeeSchema = new Schema({
    itemName:{
        type: String
    },
    vehicleId:{
        type: String
    },
    noOfUnits:{
        type: Number
    },
    priceOfAUnit:{
        type: Number
    },
    status:{
        type: Boolean,
        default: false
    }
});  

const MaintenanceFee = mongoose.model("MaintenanceFee", maintenanceFeeSchema);
module.exports = MaintenanceFee;