const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        required:true
    },
    verificationString:{
        type:String,
        required:false
    }
})

module.exports= 

{
    dbModel:mongoose.model('users',schema)
}