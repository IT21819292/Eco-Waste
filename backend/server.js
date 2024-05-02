const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();

//import routes
const userRoutes = require('./routes/Users');
const requestRoutes = require('./routes/Requests');
const productRoutes = require('./routes/Products');
const checkOutRoutes = require('./routes/CheckOuts');
const cardRoutes = require('./routes/Cards');
const truckRoutes = require("./routes/trucks.js");
const assignedTruckRoutes = require("./routes/assignedtrucks.js");
const maintenanceFee = require("./routes/maintenanceFee.js");



//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(userRoutes);
app.use(requestRoutes);
app.use(productRoutes);
app.use(checkOutRoutes);
app.use(cardRoutes);
app.use("/api", truckRoutes);
app.use("/api", assignedTruckRoutes);
app.use("/api", maintenanceFee);


const PORT = process.env.Port;
const DB_URL = process.env.Url;


mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(() =>{
    console.log('DB connected ✅');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT} 🔵`);
});


