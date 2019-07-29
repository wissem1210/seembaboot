var mongoose = require('mongoose')
var request = require('request');
var Match = require('../models/match');
var Team = require('../models/team');
var MatchDetails = require('../models/matchDetails');


function getAllMatchs(req, res){
    
    console.log(req.headers)
    var options = {
        url: 'http://ec2-user@ec2-18-188-240-178.us-east-2.compute.amazonaws.com:3333/api/v1/matchs',
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

function getAllLocalMatchs(req, res){
    
 
    Match
    .find()
    
    .exec(function(err,matchs){
        if(err){
            console.log(err)
        } else

    res.json(matchs);

    });
    
   
  
   
}


async function createLocalMatch(idMatch,team_a,team_b){

    return new Promise((resolve, reject)=>{
        var match= new Match();
        //console.log(req.body)
        match.idMatchTracking = idMatch;
        match.teamA = team_a;
        match.teamB = team_b;
        
        
        
        match.save((err,m) => {
            if(err)
                reject(err)
            

            resolve(m) 
        });
    })
   
   


    
    
  
   
}

async function updateMatchDetails(idMatch,score_a,score_b){
    return new Promise((resolve, reject) => {
    Match
    .findById(idMatch)
    .exec(function(err,match){
        if(err){
            console.log(err)
        } else {
            console.log(match)
         match.scoreA = score_a;
         match.scoreA = score_b;
         match.save(function(err,res){
            if(err){
                console.log(error)
                reject(null)
            } else {
                console.log('match updated')
                
                 
          } })
             
        }
        console.log('match created')
        resolve(match) 

    });
    
   
  
   
})}


async function getMatchById(id, auth){
        return new Promise((resolve, reject) => {
        
    
    var options = {
        url: 'http://ec2-user@ec2-18-188-240-178.us-east-2.compute.amazonaws.com:3333/api/v1/matchs/'+id,
        method: 'get',
        headers: {
            "Authorization" : auth
        }
    }
    
    request(options, function (error, response) {
        if(error){
            console.log(error)
            reject (null)
        } else {
            
            console.log('match found')
            resolve(response.body) 
        }
    })
})
} 

async function getTeamByExternalId(id){
    return new Promise((resolve, reject)=> {
        Team
        .findOne({"externalTeamId" : id})
        .exec((err, team) =>{
            if(err)
                reject(null);
            else{
                resolve(team);
            }
        })
    })
}
let  aaa = async (req, res)=>{
    
   try {
    let match = await getMatchById(req.params.id, req.headers['authorization'])
    match = JSON.parse(match)
    console.log("match", match);
    
    if (match == null) {
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
   
 //   console.log(match)
  //  if(match === null){
    //    console.log("Match not found")
    //} else {
      //  console.log(match);
      //
        //try {
          //  const user = await User.findById(_id)
    
            //if (!user) {
              //  return res.status(404).send()
           // }
    
            //res.send(user)
        //} catch (e) {
          //  res.status(500).send()
        //}
      
        //idMatch = match.id;
        //team_a= match.team_a;
        //team_b= match.team_b;
        //matchdetails = createLocalMatch(idMatch,team_a,team_b,res)
       // while(match.status=0){
       //     matchdetails.scoreA= match.score_a;
       //     matchdetails.scoreB= match.score_b;
      //  }
    


// promise await async callback
function createMatchDetails(req, res){
   
var matchdetails= new MatchDetails();
    
    console.log(req.body)
    matchdetails.id= match.id;
    
    
    
    match.save((err,t) => {
        if(err)
            res.json(err)
        
        res.json(t)
    });


    
    
  
   
}





module.exports = {getAllMatchs, createLocalMatch,createMatchDetails,updateMatchDetails,getMatchById,aaa,getAllLocalMatchs};