const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TournamentSchema = new Schema({
    name: {type:String, default:''},
    maxTeams: {type: Number,default:2} ,
    
    game: { type: Schema.ObjectId, ref: 'game' },
    teams: [{ type: Schema.ObjectId, ref: 'Team' }],
    
    
  },{
    timestamps : true
  });

  module.exports = mongoose.model('Tournament', TournamentSchema);
