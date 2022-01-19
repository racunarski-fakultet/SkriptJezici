const ekspres = require("express");
const ruter=ekspres.Router();
const db = require("./models/db-export.js");
const joi=require("Joi");
const cors = require('cors')
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');


async function overiPovlastice(req){
  
  let token=req.cookies['token'];
  data={
    povlastice:token
  };

  vrednost=await fetch('http://localhost:11000/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify(data)
  }).then(res=>{
    if(res.status===400 || res.status===500){
      return false;
      
    }
    else{
      return true;
    }
    });
    return vrednost;
}


var corsOptions = {
    origin: true,
    credentials: true,
  optionsSuccessStatus: 200
}

ruter.use(cors(corsOptions));
const semai=joi.object({
  id:             joi.number().integer().required(),
  ime:            joi.string().max(50).required(),
  prezime:        joi.string().max(50).required(),
  telefon:        joi.string().max(50).required(),
  adresaId:       joi.number().integer().required()
});
const semad=joi.object({
  id:             joi.number().integer().required(),
});
const semau=joi.object({
  id:             joi.number().integer().required(),
  ime:            joi.string().max(50).allow(''),
  prezime:        joi.string().max(50).allow(''),
  telefon:        joi.string().max(50).allow(''),
  adresaId:       joi.number().integer().allow('')
});

ruter.use(ekspres.json());
ruter.use(ekspres.urlencoded({ extended: true }));
ruter.use(cookieParser());
//GET
ruter.get("/", (req,res)=>{
  db.sequelize.query('SELECT * FROM Primalac')
  .then(function(result) {res.send(result);})
  .catch( err => res.status(500).json(err) );
});
  
//Update
ruter.put("/",  (req,res)=>{
  let br=0;
  let text="UPDATE Primalac SET "
  const par1=req.body.id;
  const par2=req.body.ime;
  const par3=req.body.prezime;
  const par4=req.body.telefon;
  const par5=req.body.adresaId;

  if(par2 !== null && par2!=='' && typeof par2!=='undefined'){
    text+=" Ime='"+par2+"'";
    br++;
  }
  if(par3 !== null && par3!=='' && typeof par3!=='undefined'){
    if(br>0)
      text+=" , "
    text+="Prezime='"+par3+"'";
    br++;
  }
  if(par4 !== null && par4!=='' && typeof par4!=='undefined'){
    if(br>0)
      text+=" , "
    text+="Telefon='"+par4+"'";
    br++;
  }
  if(par5 !== null && par5!=='' && typeof par5!=='undefined'){
    if(br>0)
      text+=" , "
    text+="AdresaId="+par5;
    br++;
  }

  if(par1 !== null && par1!=='' && typeof par1!='undefined');
    text+=" WHERE Id="+par1;

  
    let { value,error } = semau.validate(req.body);
    if(typeof error !== 'undefined'){
      res.status(400).send(error.details);
    }
    else{

  db.sequelize.query(text)
  .then(function(result) {res.send(result);})
  .catch( err => res.status(500).json(err) );
    }

});

//insert
ruter.post("/", (req,res)=>{
  const par1=req.body.id;
  const par2="'"+req.body.ime+"'";
  const par3="'"+req.body.prezime+"'";
  const par4="'"+req.body.telefon+"'";
  const par5=req.body.adresaId;

  let { value,error } = semai.validate(req.body);
  if(typeof error !== 'undefined'){
    res.status(400).send(error.details);
  }
  else{
  db.sequelize.query("INSERT INTO Primalac values ("+par1+","+par2+","+par3+","+par4+","+par5+")")
  .then(function(result) {res.send(result);})
  .catch( err => res.status(500).json(err) );
  }
});
//delete
ruter.delete("/", (req,res)=>{
  const param1=req.body.id;
  let { value,error } = semad.validate(req.body);
  if(typeof error !== 'undefined'){
    res.status(400).send(error.details);
  }
  else{
  db.sequelize.query("DELETE FROM Primalac WHERE Id="+param1)
  .then(function(result) {res.send(result);})
  .catch( err => res.status(500).json(err) );
  }
});

module.exports=ruter;