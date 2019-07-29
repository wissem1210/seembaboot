

var Round = require('../models/round');
var Tournament = require('../models/tounament');

function setNumberofRounds(req, res){
    var rounda = new Round();
    Tournament.findById(req.body.tournamentId)
    .exec(function(err,tourn){
        if(err){
            console.log(err)
        } else

    //res.json(tourn);
    console.log(tourn.maxTeams)
    var roundNumber = Math.log(tourn.maxTeams);
    console.log(roundNumber)
    console.log(Math.round(roundNumber));
    rounda.matches.lenght=Math.round(roundNumber)
    rounda.save((err,t) => {
        if(err)
           res.json(err)
        
     res.json(t.matches.lenght)
    });
    });
    
   // var roundNumber = Math.log(t.maxTeams);
   // console.log(roundNumber)
    
    
    
   
  
   
}


function addRound(req, res){
   
    var round = new Round();
    
    round.save((err,t) => {
        if(err)
            res.json(err)
        
        res.json(t)
    });


    
    
  
   
}


function joinRoundById(req, res){
  
    Round
    .findById(req.params.roundId)
    .exec(function(err,round){
        if(err){
            console.log(err)
        } else {
         round.matches.push(req.body.match)
         round.save(function(err,res){
            if(err){
                console.log(err)
            } else {
               
                 
          } })
             
        }
    res.json(round);

    });
    
   
  
   
}

function getAllRounds(req, res){
    var query = {};
    if (req.query.round){
        query.id=req.query.id;
    }
     Round
     .find(query)
     
     .populate("matches")
     .exec(function(err,matches){
         if(err){
             console.log(err)
         } else
 
     res.json(matches);
 
     });
     
    
   
    
 }


module.exports = {setNumberofRounds,addRound,joinRoundById,getAllRounds };