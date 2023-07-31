import express  from "express";
import cors from "cors";
import Connection from "./db.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json())

//extracting data from env
const userName=process.env.Db_User;
const password=process.env.Db_Pass;
console.log(userName,password)
const PORT=process.env.PORT||8080;

//setting up schema for databases;

const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{timeStamps:true})

const userModel=mongoose.model("user",schemaData);


//creationg of apis
//read api
app.get("/",async(req,res)=>{
    const data=await userModel.find({})

    res.json({success:true,data:data})
})

//post api

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=await new userModel(req.body)
    await data.save()
    res.send({success:true,message:"data save successfully" ,data:data})
})

app.put("/update",async(req,res)=>{
    console.log(req.body)
    const  {_id,...rest}=req.body;
    console.log(rest)
    const data=await userModel.updateOne({_id:_id}
        ,rest)
    
    res.send({success:true,message:"data update successfully" ,data:data})
})

//delete
app.delete("/remove/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const data=await userModel.deleteOne({_id:id})
    
    res.send({success:true,message:"data deleted successfully" ,data:data})
})

app.listen(PORT,()=>console.log("server runing..."));
Connection(userName,password);
