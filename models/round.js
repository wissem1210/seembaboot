const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RoundSchema = new Schema({


    roundName: String,

    matches: [{ type: Schema.ObjectId, ref: 'Match' }],


}, {
    timestamps: true
});

module.exports = mongoose.model('Round', RoundSchema);