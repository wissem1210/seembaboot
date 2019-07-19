const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MatchSchema = new Schema({
    idMatchTracking: {type:String, default:''},
    
    teamA:{ type: Schema.ObjectId, ref: 'Team' },
    
    teamB: { type: Schema.ObjectId, ref: 'Team' },

    scoreA:  {type: Number,default:0} ,
    scoreB: {type: Number,default:0} ,


    //winner:{ type: Schema.ObjectId, ref: 'Team' },
    //looser:{ type: Schema.ObjectId, ref: 'Team' },

  },{
    timestamps : true
  });

  module.exports = mongoose.model('Match', MatchSchema);