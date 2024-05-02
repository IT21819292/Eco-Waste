const express = require('express');
const Products = require('../models/Product');

const router = express.Router();

//Add Items
router.post('/product/add', (req,res) =>{
    let newProducts = new Products(req.body);

    newProducts.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Product saved successfully"
        });
    });
});

//get Items
router.get('/product/get', (req,res) =>{
    Products.find().exec((err,Products) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingProducts:Products
        });
    });
});

//get specific Item
router.get('/productget/:id', (req, res) => {
    const productId = req.params.id;
    Products.findById(productId, (err, product) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        product
      });
    });
  });


//update Items
router.put('/product/update/:id',(req,res)=>{
    Products.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Product Successfully"
            });
        }
    );
});



//delete post

router.delete('/product/delete/:id',(req,res) =>{
    Products.findByIdAndRemove(req.params.id).exec((err,deletePost) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccessfull",err
        });

        return res.json({
            message:"Delete Successfull",deletePost
        });
    });
});


module.exports = router;