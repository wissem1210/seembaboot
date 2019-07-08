const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, default: '' }
  });

  var GAme = mongoose.model('Game', GameSchema);

  module.exports = GameSchema;