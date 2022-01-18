
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

require('dotenv').config();


const app = express();

var corsOptions = {
    origin: ['http://localhost:9000','http://localhost:8000'],
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

app.post('/login', (req, res) => {
    const par1=req.body.korisnickoIme;
    const par2=req.body.lozinka;

    data={
        korisnickoIme:par1,
        lozinka:par2,
    }
    //proverи da li postoji nalog i dobij odgovor
    let povlastice;
    fetch('http://localhost/admin/korisnik/checkUserPrivilage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res=>{
        povlastice=res.body;
    }).catch( err => res.status(500).json(err) );

    console.log(povlastice);
    if(povlastice!=='a' || povlastice!=='m')
        res.status(400).send("Neispravno korisnicko ime ili lozinka");
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


    //cita kolacic
    console.log(token);
    try{
    const povlastice=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    if(povlastice==='a' || povlastice==='m')
        res.status(200).send("Uspesno ste ulogovani");
    else
        res.status(400);
    }
    catch{
        res.clearCookie("token");
        res.status(500).send("Niste ulogovani");
    }
});

app.post('/authm', (req, res) => {


    //cita kolacic
    console.log(token);
    try{
    const povlastice=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    if(povlastice==='m')
    res.status(200).send("Uspesno ste ulogovani");
    else
        res.status(400);
    }
    catch{
        res.clearCookie("token");
        res.status(500).send("Niste ulogovani");
    }
});


/*
app.post('/login', (req, res) => {


    //prover da li postoji
    //ako postoji sacuva kolacic
    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});*/

app.listen({ port: 11000 });