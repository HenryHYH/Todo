var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Test');

var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    Name: String,
    Finished: {type: Boolean, default: false }
});

var Todo = mongoose.model('Todo', TodoSchema, 'Todo');

module.exports = Todo;
// exports.Todo = Todo;

/*
 Todo.find(function (err, list) {
 if (err)
 console.error(err);
 list.forEach(function (item) {
 console.log(item);
 });
 });
 */