
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

require('dotenv').config();


const app = express();

var corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/register', (req, res) => {

    const data = {
        korisnickoIme: req.body.korisnickoIme,
        lozinka: req.body.lozinka,
        povlastice:req.body.povlastice
    };

    fetch('http://localhost/admin/korisnik/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch( err => res.status(500).json(err) );

    obj = {povlastice: req.body.povlastice};

    const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
    res.json(token);

});

app.post('/login', async(req, res) => {
    const par1=req.body.korisnickoIme;
    const par2=req.body.lozinka;
    let povlastice='0';
    data={
        korisnickoIme:par1,
        lozinka:par2
    }
    
    

    await fetch('http://localhost/admin/korisnik/checkUserPrivilage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data=>{

        povlastice=data.povlastice;
    });

    if(povlastice!=='a' && povlastice!=='m'){
        res.status(400).send("Neispravno korisnicko ime ili lozinka");
    }
    else{
    obj = {povlastice: povlastice};
    
    //ako postoji sacuvaj kolacic
    
    const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("token",token);
    res.header('Access-Control-Allow-Credentials','true');
    res.status(200).send("Ulogovali ste se");
    }

});


app.post('/auth', (req, res) => {
    let token=/*req.cookies['token'];*/req.body.povlastice;
    if(token=== 'undefined')
        res.status(500).send("Nemate kolacic");

    
    try{
        const povlastice=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        if(povlastice.povlastice==='a' /*|| povlastice.povlastice==='m'*/)
            res.status(200).send("Uspesno ste ulogovani");
        else
            res.status(400).send("Nemate dobar kolacic");
    }
    catch(err){
        res.status(500).send("Niste ulogovani "+err);
    }
});

app.post('/authm', (req, res) => {
    let token=/*req.cookies['token'];*/req.body.povlastice;
    if(token=== 'undefined')
        res.status(500).send("Nemate kolacic");

    
    try{
        const povlastice=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        if(povlastice.povlastice==='m')
            res.status(200).send("Uspesno ste ulogovani");
        else
            res.status(400).send("Nemate dobar kolacic");
    }
    catch(err){
        res.status(500).send("Niste ulogovani "+err);
    }
});


app.listen({ port: 11000 });

//nece da dodje do ovog servisa preko resta