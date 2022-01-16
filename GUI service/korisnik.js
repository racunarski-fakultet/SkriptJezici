const ekspres = require("express");
const path=require("path");
const ruter=ekspres.Router();

ruter.get("/public/CSS/izgled.css",(req,res)=>{
    res.sendFile(path.join(__dirname,'static','public','CSS','izgled.css'));
});


//select
ruter.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,'static','korisnik.html'));

});
module.exports=ruter;