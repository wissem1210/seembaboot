const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type:String, default:''}
    

   
  });

  module.exports = mongoose.model('User', UserSchema);
