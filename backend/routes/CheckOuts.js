const express = require('express');
const Checkouts = require('../models/CheckOut');

const router = express.Router();

//Add Items
router.post('/checkout/create', (req,res) =>{
    let newCheckouts = new Checkouts(req.body);
    newCheckouts.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"CheckOuts saved successfully"
        });
    });
});

//get all checkouts
router.get('/checkout/get', (req,res) =>{
    Checkouts.find().exec((err,Checkouts) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingCheckouts:Checkouts
        });
    });
});

//get specific Item
router.get('/checkout/:id', (req, res) => {
    const checkoutId = req.params.id;
    Checkouts.findById(checkoutId, (err, checkout) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        checkout
      });
    });
  });

//update checkouts
router.put('/checkout/update/:id',(req,res)=>{
    Checkouts.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Checkouts update Successfully"
            });
        }
    );
});

//delete checkouts
router.delete('/checkout/delete/:id',(req,res) =>{
    Checkouts.findByIdAndRemove(req.params.id).exec((err,deletePost) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccessfull",err
        });

        return res.json({
            message:"Delete Successfull",deletePost
        });
    });
});

module.exports = router;