const express = require('express');
const router = express.Router();
var request = require('request');
const app  = new express();

var mongoose = require('mongoose');

var Team = require('../models/team');





function addTeam(req, res){
   
    var team = new Team();
    console.log(req.body)
    team.name = req.body.name;
    team.maxPlayers = req.body.maxPlayers;
    
    
    team.save((err,t) => {
        if(err)
            res.json(err)
        
        res.json(t)
    });


    
    
  
   
}


function getTeamsPerTournament(req, res){
    var query = {};
    if (req.query.tournament){
        query.tournament=req.query.tournament;
    }
     Team
     .find(query)
     .populate("users")
     .exec(function(err,teams){
         if(err){
             console.log(err)
         } else
 
     res.json(teams);
 
     });
     
    
   
 
   
    
 }


 function getTeamById(req, res){
  
    Team
    .findById(req.params.teamId)
    .exec(function(err,team){
        if(err){
            console.log(err)
        } else

    res.json(team);

    });
    
   
  
   
}

function joinTeamById(req, res){
  
    Team
    .findById(req.params.teamId)
    .exec(function(err,team){
        if(err){
            console.log(err)
        } else {
         team.users.push(req.body.user)
         team.save(function(err,res){
            if(err){
                console.log(err)
            } else {
               
                 
          } })
             
        }
    res.json(team);

    });
    
   
  
   
}



module.exports = {addTeam,getTeamsPerTournament,getTeamById,joinTeamById};