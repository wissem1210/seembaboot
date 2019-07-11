const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Team = require('./team');

const TournamentSchema = new Schema({
    name: {type:String, default:''},
    maxTeams: {type: Number,default:2} ,
    date: { type: Date, default: Date.now },
    game: { type: Schema.ObjectId, ref: 'game' },
    teams: [{ type: Schema.ObjectId, ref: 'Team' }]
    
  });

  module.exports = mongoose.model('Tournament', TournamentSchema);
