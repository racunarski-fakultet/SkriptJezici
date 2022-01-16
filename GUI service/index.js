const express =require("express");
const path=require("path");
const ruter=express.Router();


ruter.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname,'static','index.html'));
});

ruter.get("/public/CSS/izgled.css",(req,res)=>{
    res.sendFile(path.join(__dirname,'static','public','CSS','izgled.css'));
});

ruter.get("/public/JS/indexf.js",(req,res)=>{
    res.sendFile(path.join(__dirname,'static','public','JS','indexf.js'));
});

module.exports=ruter;