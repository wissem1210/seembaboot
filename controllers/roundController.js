

var Round = require('../models/round');
var Tournament = require('../models/tournament');

function setNumberofRounds(req, res){
    var round = new Round();
    var tournament =Tournament.findById(req.params.tournamentId)
    var roundNumber = Math.log(tournament.maxTeams);
    round.matches.lenght=Math.round(roundNumber)
   
    
   
  
   
}



module.exports = {setNumberofRounds};