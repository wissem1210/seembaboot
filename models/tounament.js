const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    name: {type:String, default:''},
    maxPlayers: {type: Number,default:2} ,
    date: { type: Date, default: Date.now },
    game: { type: Schema.ObjectId, ref: 'game' }

  });

  module.exports = mongoose.model('Tournament', TournamentSchema);
