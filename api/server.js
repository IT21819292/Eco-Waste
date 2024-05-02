import express from "express";
import {config} from "dotenv";
import truckRoutes from "./routes/trucks.js";
import assignedTruckRoutes from "./routes/assignedtrucks.js";
import maintenanceFee from "./routes/maintenanceFee.js";
import cors from "cors";
import dbConnect from "./dbConnect.js";
import bodyParser from "body-parser";




const app = express();

//allows us access environment variables like dotenv files
config();

dbConnect();


//allows us get json object in request body
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(bodyParser.json());



app.use("/api", truckRoutes);
app.use("/api", assignedTruckRoutes);
app.use("/api", maintenanceFee);

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
