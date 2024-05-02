const express = require('express');
const Requests = require('../models/Request');

const router = express.Router();

//Add Requests

router.post('/request/add', (req, res) => {
    let newRequest = new Requests(req.body);
    newRequest.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
        });
    });
});



//get Requests
router.get('/request/getall', (req,res) =>{
    Requests.find().exec((err,Requests) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingRequests:Requests
        });
    });
});

//get specific Item
router.get('/request/get/:id', (req, res) => {
    const requestId = req.params.id;
    Requests.findById(requestId, (err, request) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        request
      });
    });
  });


//update Requests
router.put('/request/update/:id',(req,res)=>{
    Requests.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});



//delete post

router.delete('/request/delete/:id',(req,res) =>{
    Requests.findByIdAndRemove(req.params.id).exec((err,deletePost) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccessfull",err
        });

        return res.json({
            message:"Delete Successfull",deletePost
        });
    });
});






module.exports = router;