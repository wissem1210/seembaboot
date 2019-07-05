const express = require('express');
var request = require('request');
const router = express.Router();

var cors = require('cors')
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true}))
const userRoutes = require('./routes/user');

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
app.listen(8000,()=>{
    console.log('listening to port 8000 ')
})