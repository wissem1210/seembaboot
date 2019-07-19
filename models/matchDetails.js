const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MatchDetailsSchema = new Schema({
    idMatchTracking: {type:String, default:''},

    teamA:{ type: Schema.ObjectId, ref: 'Team' },
    
    teamB: { type: Schema.ObjectId, ref: 'Team' },

    scoreA:  {type: Number,default:0} ,
    scoreB: {type: Number,default:0} ,
  });

  module.exports = mongoose.model('MatchDetails', MatchDetailsSchema);