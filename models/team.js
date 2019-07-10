const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./user');

const TeamSchema = new Schema({
    name: {type:String, default:''},
    maxPlayers: {type: Number,default:2} ,
    date: { type: Date, default: Date.now },
    users: [{ type: Schema.ObjectId, ref: 'team' }]

  });

  module.exports = mongoose.model('Team', TeamSchema);