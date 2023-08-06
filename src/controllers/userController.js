const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const User= require('../models/Users');


const registerUser= async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists"});

        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch(error){
        console.error('error registering user',error);
        res.status(500).json({message:'Internal server error'});
    }

    
};

const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
    
        const user= await User.findOne({email});

        if(!user){
            return res.status(404).json({message:'User not found'});
        }


        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid credentials"});
        }

    // res.status(200).json({message:"Successfully logged in"});

        //create token
        const token=jwt.sign({userId:user._id},process.env.SECRET_KEY);
        res.json({token, message:"Successfully logged in"});
        console.log(token);



    }
    catch(error){
        console.error('error loging in user',error);
        res.status(500).json({message:'Internal server error'});
    }
};

module.exports={registerUser,loginUser};





