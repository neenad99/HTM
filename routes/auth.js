const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Users  = require('../models/usermodel');

router.post("/register", async (req, res) => {

    try{
        const isEmailExist = await Users.findOne({ email: req.body.email });
        // throw error when email already registered
        if (isEmailExist)return res.status(400).json({ message: "Email already exists" });
    }catch(error){
        res.status(400).json({'error':error,message:"Error in fetching details"});
    }

    
    
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        mobno:req.body.mobno,
        password:hashedpassword
    });

    // create token
    const token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
    );
    

    try{
        const savedUser = await user.save();
        res.json({message:"signup successful",data: savedUser,token:token});
    }catch(error){
        res.status(400).json({'error':error,message:"Error in signup"});
    }
});

router.post('/login',async (req,res)=>{

    try{
        var user = await Users.findOne({ email: req.body.email });
        // throw error when email is wrong
        if (!user)return res.status(400).json({ error: "Email not found" });
    }catch(err){
        res.json({error:err,message:"error in fetching user details"});
    }
    

    // check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)return res.status(400).json({ error: "Password is wrong" });

    // create token
    const token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
    );
    
    res.json({
        message: "Login successful",
        token:token
    });
});



module.exports = router;