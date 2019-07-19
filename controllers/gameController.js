


var Game = require('../models/game');


function getAllGames(req, res){
   
    Game
    .find()
    .exec(function(err,games){
        if(err){
            console.log(err)
        } else

    res.json(games);

    });
    
   
  
   
}

function addGame(req, res){
   
    var game = new Game();
    console.log(req.body)
    game.name = req.body.name;
    game.save((err,t) => {
        if(err)
            res.json(err)
        
        res.json(t)
    });


    
    
  
   
}


module.exports = {getAllGames,addGame};