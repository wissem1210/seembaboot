const express = require('express');
const router = express.Router();
var request = require('request');
const app  = new express();

var mongoose = require('mongoose');

var Tournament = require('../models/tounament');


function getAllTournaments(req, res){
   
    Tournament
    .find()
    .exec(function(err,tournaments){
        if(err){
            console.log(err)
        } else

    res.json(tournaments);

    });
    
   
  
   
}

function addTournament(req, res){
   
    var tournament = new Tournament();
    console.log(req.body)
    tournament.name = req.body.name;
    tournament.maxPlayers = req.body.maxPlayers;
    tournament.save((err,t) => {
        if(err)
            res.json(err)
        
        res.json(t)
    });


    
    
  
   
}


module.exports = {getAllTournaments,addTournament};