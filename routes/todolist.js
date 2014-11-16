var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('todolist', {title: 'Todo list'});
});

module.exports = router;
