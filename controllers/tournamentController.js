const express = require('express');
const router = express.Router();
var request = require('request');
const app  = new express();

var mongoose = require('mongoose');

var Tournament = require('../models/tounament');


function getAllTournaments(req, res){
   var query = {};
   if (req.query.game){
       query.game=req.query.game;
   }
    Tournament
    .find(query)
    .populate("teams")
    .exec(function(err,tournaments){
        if(err){
            console.log(err)
        } else

    res.json(tournaments);

    });
    
   
  
   
}
function getTournamentById(req, res){
  
     Tournament
     .findById(req.params.tournamentId)
     .exec(function(err,tournament){
         if(err){
             console.log(err)
         } else
 
     res.json(tournament);
 
     });
     
    
   
    
 }


function addTournament(req, res){
   
    var tournament = new Tournament();
    console.log(req.body)
    tournament.name = req.body.name;
    tournament.maxPlayers = req.body.maxPlayers;
    tournament.game = req.body.game;
    tournament.save((err,t) => {
        if(err)
            res.json(err)
        
        res.json(t)
    });


    
    
  
   
}

function joinTournamentById(req, res){
  
    Tournament
    .findById(req.params.tournamentId)
    .exec(function(err,tournament){
        if(err){
            console.log(err)
        } else {
         tournament.teams.push(req.body.team)
         tournament.save(function(err,res){
            if(err){
                console.log(err)
            } else {
               
                 
          } })
             
        }
    res.json(tournament);

    });
    
   
  
   
}


module.exports = {getAllTournaments,addTournament,getTournamentById,joinTournamentById};