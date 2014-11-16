var express = require('express'),
    router = express.Router();
// var Todo = require('../models/todo');

/* GET home page. */
router.get('/', function (req, res) {
    /*
     Todo.find(function (err, list) {
     res.render('todo', {
     title: 'Todo',
     todoList: list
     });
     });
     */
    res.render('todo', {title: 'Todo'});
});

module.exports = router;
