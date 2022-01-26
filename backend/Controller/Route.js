require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors=require('cors');
const { dbModel } = require('../model/dbModel');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../sendEmail'); 
 
 const signUp=async (req,res)=>{
    const {email,password}=req.body;
    
    const expirationSeconds = 60 * 60 * 24 * 7; // one week
    const cookieExpiration = Date.now() + expirationSeconds * 1000;
    const user =  await dbModel.findOne({email});
    if(user && Object.keys(user).length>=0)
    res.status(409).json({message:"User already exists"});
    else{
        const info={
            hairColor:'',
            bio:'',
            favoriteFood:'',

        }
        const verificationString=uuidv4();
        const passwordHash=await bcrypt.hash(password,10);
        const data=new dbModel ({
            email:email,
            password:passwordHash,
            verificationString:verificationString,
            isVerified:false,
            info:info

        });

        const result  = await data.save(); 
      

 


        try{
            await sendEmail({
                to:email,
                from:'nayaabahmedn@gmail.com',
                subject:"Verify User",
                text:`plese click on the below link to verify 
                http://localhost:3000/verify-email/${verificationString}
                `
                
                
    
            });
            
            }
            catch(err){
                console.log(err);
                res.sendStatus(500);
            }
    
    
           jwt.sign({
                 id:uuidv4(),
                 email,
                 info:info,
                 isVerified:false,
                 verificationString
           },
           process.env.JWT_SECRET_KEY,{
               expiresIn:'2d'
           }
           ,
           (err,token)=>{
               if(err){
                   console.log(err);
                   return res.status(500).send(err);
               }
               else{
                
                return res.json({
                    success: true,
                    token: `JWT ${token}`,
                   });
               }
               
           }
           );
          
    }



    


}

module.exports={
    signUp
}