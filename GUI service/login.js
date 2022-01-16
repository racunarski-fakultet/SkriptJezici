const express = require("express");
const path=require("path");
const ruter=express.Router();

ruter.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'static','login.html'));
});

ruter.get("/public/CSS/izgled.css",(req,res)=>{

    res.sendFile(path.join(__dirname,'static','public','CSS','izgled.css'));
});


module.exports=ruter;