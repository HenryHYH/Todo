var Todo = require('./models/todo');

Todo.find(function (err, list) {
    if (err)
        console.error(err);
    list.forEach(function (item) {
        console.log(item);
    });
});