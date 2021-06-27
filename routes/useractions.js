const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const Users = require('../models/usermodel');
const Posts = require('../models/postmodel');
const upload = require('../routes/img-upload');


router.post("/action",async (req,res)=>{
    try{
    var user = await Users.findOne({ email: req.user.email});
    }catch(err){
        res.json({error:err,message:"unable to fetch details of post creator"});
    }
    
    upload(req,res,(err)=>{
        if(err){
            res.json({error:err,message:'upload Images Only'});
        }
        else{
            console.log(req.file);
            res.json({test:'test'});
        }
    });

    // try{
    //     const savedPost = await post.save();
    //     res.json({message:"post created successfully",data: savedPost,token:token});
    // }catch(error){
    //     res.status(400).json({'error':error,message:"Error in saving post"});
    // }
});

module.exports = router; 