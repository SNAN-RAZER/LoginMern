
//importing dependencies
const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const router = require('./routes/signupPage_Route');


require('dotenv').config()

const PORT = process.env.PORT || 8080;


const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.prependOnceListener('open',()=>{
    app.listen(PORT);
    console.log('Server running')
}).on('error',(error)=>{
    console.log(error);
})

app.get('/',cors(),(req,res)=>{
   res.sendStatus(200);
});
app.use('/',router);