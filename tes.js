require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log(err);
})

app.get('/',(req,res)=>{
    res.send('hello world');
})
let user=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
})
let User=mongoose.model('User',user);
app.post('/user',async(req,res)=>{
    let user=new User({
        name:req.body.name,
        email:req.body.email
    })
    await user.save();
    res.send('user created');
})
app.get('/user',async(req,res)=>{
    let users=await User.find();
    res.json(users);
})
let port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`${port}server started`);
})