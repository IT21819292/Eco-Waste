const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

//const URL = process.env.MONGODB_URL;

//connection with database

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//open connection
const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb Connection Success!");
})

const regularrouteRouter = require("./routes/regularroutes");
//http:localhost/8070/regularroutes
app.use("/regularroutes",regularrouteRouter);

app.listen(PORT,() => {
    console.log(`Server is up and Running on Port: ${PORT}`)
})
