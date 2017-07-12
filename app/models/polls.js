
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollsSchema = new Schema({
    title: String,
    options: [{name: String, votes: Number}]
});
var ModelClass = mongoose.model('Polls', PollsSchema);
//module.exports = mongoose.model('Polls', PollsSchema);
module.exports = ModelClass;