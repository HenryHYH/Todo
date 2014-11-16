var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('todo', {title: 'Todo'});
});

module.exports = router;

/*
task{
    name = string,
    finished = bool,
    create_time = datetime,
    group{
        name = string
    }
}
*/