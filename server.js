const express = require('express');
var request = require('request');
const router = express.Router();

var cors = require('cors')
var bodyParser = require('body-parser')

const mongodb = require('mongodb');
const mongoClient= mongodb.MongoClient;

var mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://root:seemba2019@ds249137.mlab.com:49137/seembadb', function(err) {
  if (err) { throw err; }
});

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json({ extended: true}))
const userRoutes = require('./routes/userRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const gameRoutes = require('./routes/gameRoutes');
const teamRoutes = require('./routes/teamRoutes');
// app.use(cors())
// var allowCrossDomain = function(req, res, next) {
//     req.header('Access-Controll-Allow-Origin', '*');
//     req.header('Access-Controll-Allow-Methods', '*');
//     req.header('Access-Controll-Allow-Headers', '*');

//     if('OPTIONS' == req.method){
//         res.send(200)
//     }else{
//         next();
//     }
// }
// app.use(allowCrossDomain)



app.use(userRoutes);
app.use(tournamentRoutes);
app.use(gameRoutes);
app.use(teamRoutes);
app.listen(8000,()=>{
    console.log('listening to port 8000 ')
})