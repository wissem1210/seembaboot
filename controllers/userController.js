
var request = require('request');

var User = require('../models/user');


function signin(req, res){
        console.log("here........")
        console.log(req.body)
        console.log(req.query)
        console.log(req.params)
        var options = {
            url: 'https://seemba-api.herokuapp.com/api/v1/users',
            method: 'POST',
            form: {'username': req.body.username, 'email': req.body.email, 'password': req.body.password}
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

function authentication(req, res){
 
        var options = {
            url: 'https://seemba-api.herokuapp.com/api/v1/authenticate',
            method: 'POST',
            form: {'username': req.body.username,'email': req.body.email,'password': req.body.password}
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


function login(req, res){
 
    var options = {
        url: 'http://ec2-user@ec2-18-188-240-178.us-east-2.compute.amazonaws.com:3333/api/v1/login',
        method: 'POST',
        form: {'email': req.body.email,'password': req.body.password}
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

function show(req, res){
 
    var options = {
        url: 'http://ec2-user@ec2-18-188-240-178.us-east-2.compute.amazonaws.com:3333/api/v1/users/info',
        method: 'GET',
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


function addUser(req, res){
   
    var user = new User();
    console.log(req.body)
    user.username = req.body.username;
   
    user.save((err,t) => {
        if(err)
            res.json(err)
        
        res.json(t)
    });


    
    
  
   
}


function getUsers(req, res){
    var query = req.query;
   
     User
     .find(query)
     .exec(function(err,users){
         if(err){
             console.log(err)
         } else
 
     res.json(users);
 
     });
     
    
   
    
 }


 function getUserById(req, res){
  
    User
    .findById(req.params.userId)
    .exec(function(err,user){
        if(err){
            console.log(err)
        } else

    res.json(user);

    });
    
   
  
   
}




module.exports = {authentication, signin,addUser,getUsers,getUserById,login,show};