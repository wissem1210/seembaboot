const express = require('express');
const router = express.Router();
var request = require('request');


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

module.exports = {authentication, signin};