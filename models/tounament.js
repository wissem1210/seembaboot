const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);




const TournamentSchema = new Schema({
    name: {type:String, default:''},
    maxTeams: {type: Number,default:2} ,
    
    game: { type: Schema.ObjectId, ref: 'game' },
    teams: [{ type: Schema.ObjectId, ref: 'Team' }],
    rounds:[{ type: Schema.ObjectId, ref: 'Round' }]
    
    
  },{
    timestamps : true
  });

  TournamentSchema.plugin(deepPopulate,  {
    whitelist: [
      'teams',
      'rounds.matches'
    ]
  });
  
  module.exports = mongoose.model('Tournament', TournamentSchema);
