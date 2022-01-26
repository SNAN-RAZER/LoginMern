const express = require('express');
const router =express.Router();


require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors=require('cors');
const { dbModel } = require('../model/dbModel');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../sendEmail');


const { signUp } = require('../Controller/Route');




//signUP route
router.post('/api/signUp',cors(), signUp);


//login route
router.post('/api/login',cors(),async (req,res)=>{
    const {email:userEmail,password}=req.body;
    const user = await dbModel.findOne({userEmail});
    if(user&& Object.keys(user).length===0)
    res.status(400).send({message:"User doesnt exists"});
    const{email,password:hashPassword,isVerified,verificationString,info}=user;
    const isPasswordCorrrect = await bcrypt.compare(password,hashPassword);
    if(isPasswordCorrrect){
        jwt.sign({
            email,
    
            isVerified,
            info:info,
            verificationString
        },
        process.env.JWT_SECRET_KEY,{
            expiresIn:'2d'
        },
        (err,token)=>{
            if(err)
            return res.sendStatus(500)
            return res.json({
                success: true,
                token: `JWT ${token}`,
               });
        }
        )
    }

})

module.exports=router;