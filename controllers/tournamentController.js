


var Tournament = require('../models/tounament');


function getAllTournaments(req, res){
   var query = {};
   var opts = {
    path: 'rounds.matchs'
  
};
   if (req.query.game){
       query.game=req.query.game;
   }
    Tournament
    .find(query)
    
    .populate("teams")
    .populate({ 
        path: 'rounds',
        populate: {
          path: 'matches',
          model: 'Match'
        } 
     })
   
    .exec(function(err,tournaments){
        if(err){
            console.log(err)
        } else
       
       res.json(tournaments)

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

async function joinTournamentById(id,req, res){
  return new Promise((resolve,reject)=>{
    Tournament
    .findById(id)
    .exec(function(err,tournament){
        if(err){
            console.log(err)
        } else {
            if(tournament.maxTeams==tournament.teams.length)
            console.log("team is full")
            else if (tournament.maxTeams>tournament.teams.length){
         tournament.teams.push(req.body.team)
         tournament.save(function(err,res){
            if(err){
                console.log(err)
                reject(null)
            } else {
               
                 
          } })
             
        }}
     resolve(res.json(tournament));

    });
  }) 
}


function addRoundToTournamentById(req, res){
  
    Tournament
    .findById(req.params.tournamentId)
    .exec(function(err,tournament){
        if(err){
            console.log(err)
        } else {
          while(Math.round(Math.log(tournament.maxTeams))<tournament.rounds.length() ){
            tournament.rounds.push(req.body.round)
            tournament.save(function(err,res){
               if(err){
                   console.log(err)
               } else {
                  
                    
             } })
          }
         
             
        }
    res.json(tournament);

    });
    
   
  
   
}



let  bbb = async (req, res)=>{
    
    try {
    
     let tournament = await joinTournamentById(req.params.id,req.body.team,res)
     tournament = JSON.parse(tournament)
     console.log("tournament", tournament);
     
     if (tournament== null) {
         return res.status(404).send()
     }
     
     let team_a = await getTeamByExternalId(match.data.team_a);
     let team_b = await getTeamByExternalId(match.data.team_b);
     
     let matchdetails = await createLocalMatch(match.data.id,team_a,team_b)
     console.log("match details", matchdetails);
     
 
     //TODO update match till is finished
 
      let matchstatus = JSON.parse(match.status)
      console.log({matchstatus});
 
     // while(matchstatus != 0){
     //     setTimeout(async () => {
     //         let match = await getMatchById(req.params.id, req.headers['authorization'])
     // if (match == null) {
     //     return res.status(404).send()
     // }
 
     // let score_a=  match.data.score_a;
     // let score_b=  match.data.score_b;
     // let matchstatus = match.data.status
     // console.log({matchstatus});
 
     //         let realTimeMatch = await updateMatchDetails(idMatch,score_a,score_b)
     //         console.log({realTimeMatch})
     //     }, 2000)
     // }
     } catch (e) {
         console.log(e)
         res.status(500).send()
     }
 }
module.exports = {getAllTournaments,addTournament,getTournamentById,joinTournamentById,addRoundToTournamentById};