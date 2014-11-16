var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Todo = require('../models/todo');

// 获取groupId
router.get('/groupid/:groupid?', function (req, res) {
    Todo.find({GroupId: mongoose.Types.ObjectId(req.param("groupid"))}, function (err, result) {
        res.json({success: true, data: result});
    });
});

// 保存todo
router.post('/save', function (req, res) {
    var todo = new Todo({
        Name: req.param('name'),
        Finished: false,
        CreateDate: new Date(),
        GroupId: mongoose.Types.ObjectId(req.param('groupid'))
    });

    todo.save(function (err) {
        if (err)
            res.json({success: false, msg: err.message});
        else
            res.json({success: true});
    });
});

module.exports = router;