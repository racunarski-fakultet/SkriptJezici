const express =require("express");
const app=express();
const path=require("path");
const cors = require('cors');


const adresa=require(path.join(__dirname,'adresa.js'));
const proizvod=require(path.join(__dirname,'proizvod.js'));
const primalac=require(path.join(__dirname,'primalac.js'));
const porudzbina=require(path.join(__dirname,'porudzbina.js'));
const korisnik=require(path.join(__dirname,'korisnik.js'));
const KorisnikPorudzbina=require(path.join(__dirname,'korisnik-porudzbina.js'));


app.use('/admin/adresa',adresa);
app.use('/admin/proizvod',proizvod);
app.use('/admin/primalac',primalac);
app.use('/admin/porudzbina',porudzbina);
app.use('/admin/korisnik',korisnik);
app.use('/admin/korisnik-porudzbina',KorisnikPorudzbina);


app.listen(80);