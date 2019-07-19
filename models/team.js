const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TeamSchema = new Schema({
    name: {type:String, default:''},
    maxPlayers: {type: Number,default:2} ,
   
   
    users: [{ type: Schema.ObjectId, ref: 'User' }],
    externalTeamId : Number

  },{
    timestamps : true
  }
);
  module.exports = mongoose.model('Team', TeamSchema);