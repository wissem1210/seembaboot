const express = require('express');

const app  = new express();
const db = require('../database/db.js');


app.get('/',(req,res)=>{
    const query=' SELECT * FROM tournoi'
        db.query(query,(error,dbResponse)=>{
        console.log(dbResponse);
        res.json(dbResponse)
    })
    db.end();
  

})

app.listen(5003);
