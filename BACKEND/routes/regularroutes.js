const router = require("express").Router();
let regularroute = require("../models/regularroute");


//add data
//http://localhost:8070/regularroutes/add
router.route ("/addrroute").post((req,res)=>{
    //add id
    const rdayid = req.body.rdayid
    const rday = req.body.rday;
    const rroute = req.body.rroute;

    const newRegularRoute = new regularroute({
        rdayid,
        rday,
        rroute
    })

    //insert to database
    newRegularRoute.save().then(()=>{
        res.json("Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display data
//http:localhost:8070/waste_type/
router.route("/allroute").get((req,res)=>{
    regularroute.find().then((regularroutes)=>{
        res.json(regularroutes)
    }).catch((err)=>{
        console.log(err)
    })
})

//update data

router.route("/updateroute/:id").put(async(req,res)=>{
    let routeId = req.params.id;
    const {rdayid,rday,rroute} = req.body;

    const updateroute = {
        rdayid,
        rday,
        rroute       
    }
    const update = await regularroute.findByIdAndUpdate(routeId,updateroute).then(()=>{
        res.status(200).send({status: "updated" })
    }).catch((err)=>{
        console.log(err);
    })
})


//delete data
router.route("/deleteroute/:id").delete(async(req,res)=>{
    let rdayid = req.params.id;


    await regularroute.findByIdAndDelete(rdayid).then(()=>{
        res.status(200).send({status: "deleted"})
    }).catch((err)=>{
        console.log(err);
    })
})

//get one waste type detail
router.route("/getroute/:id").get(async(req,res)=>{
    let regularroute = req.params.id;
    const rdayid = await waste_type.findById(rdayid).then((regularroute)=>{
      res.status(200).send({status:"fetched",regularroute})
    }).catch((err)=>{
        console.log(err);
    })
})    
module.exports = router;