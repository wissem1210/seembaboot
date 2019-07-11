const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./user');

const TeamSchema = new Schema({
    name: {type:String, default:''},
    maxPlayers: {type: Number,default:2} ,
   
   
    users: [{ type: Schema.ObjectId, ref: 'User' }]

  },{
    timestamps : true
  }
);
  module.exports = mongoose.model('Team', TeamSchema);