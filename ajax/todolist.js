var express = require('express'),
    router = express.Router(),
    Todo = require('../models/todo');

// 删除指定Id的数据
router.post('/delete/:id?', function (req, res) {
    var id = req.param('id');

    if (id) {
        Todo.findByIdAndRemove(id, function (err, doc) {
            res.json({success: true, msg: '删除成功。'});
        });
    }
});

// 获取所有数据
router.get('/', function (req, res) {
    Todo.find(function (err, list) {
        // res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.json({success: true, list: list});
    });
});

// 更新指定Id的数据
router.post('/modify/:id?', function (req, res) {
    var id = req.param('id');

    if (id) {

        Todo.findById(id, function (err, doc) {
            var todo = {Name: doc.Name, Finished: !doc.Finished};

            Todo.findByIdAndUpdate(id, todo, function (err, doc) {
                if (err) {
                    res.json({success: false, msg: err.message});
                }
                else {
                    res.json({success: true, msg: '修改成功。'});
                }
            });
        });
    }
});

module.exports = router;