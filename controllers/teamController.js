var request = require('request');

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

function getAllTeams(req, res){
    
    console.log(req.headers)
    var options = {
        url: 'http://ec2-user@ec2-18-188-240-178.us-east-2.compute.amazonaws.com:3333/api/v1/teams',
        method: 'get',
        headers: {
            "Authorization" : req.headers['authorization']
            
        }
    }
    
    request(options, function (error, response, body) {
        if(error){
            console.log(error)
            res.json(error)
        } else {
            res.json(JSON.parse(response.body))
        }
    })

}



module.exports = {addTeam,getTeamsPerTournament,getTeamById,joinTeamById,getAllTeams};