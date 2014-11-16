var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Test');

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    Name: String
});
var Group = mongoose.model('Group', GroupSchema, 'Group');
module.exports = Group;