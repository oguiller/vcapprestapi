var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
    text: String,
    index: Number,
    active: Boolean
});

module.exports = mongoose.model('Question', QuestionSchema);