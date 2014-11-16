var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    Name: String,
    Finished: {type: Boolean, default: false },
    CreateDate: Date,
    GroupId: Schema.Types.ObjectId
});
var Todo = mongoose.model('Todo', TodoSchema, 'Todo');
module.exports = Todo;