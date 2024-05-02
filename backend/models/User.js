const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{ 
    userName: String,
    fullName: String,
    email: String,
    address: String,
    password: { type: String, unique: true },
    isAdmin: Boolean,
    image: String,
    },
    {
    collection: "Users",
    }
);

module.exports = mongoose.model('Users',userSchema);