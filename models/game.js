const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, default: '' }
  });

  var Game = mongoose.model('Game', GameSchema);

  module.exports = Game;

  //module.exports = mongoose.model('Game', GameSchema);