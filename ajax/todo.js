var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Todo = require('../models/todo');

// 获取groupId
router.get('/groupid', function (req, res) {
    var cond = {GroupId: mongoose.Types.ObjectId(req.param("groupid"))};
    if (req.param("viewFinished") == 'false')
        cond.Finished = false;

    Todo.find(cond, null, {sort: {CreateDate: -1}}, function (err, result) {
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

// 改变状态
router.post("/changestatus", function (req, res) {
    var id = req.param('taskid');

    if (id) {

        Todo.findById(id, function (err, doc) {
            var todo = {
                Finished: req.param('finished') == 'true'
            };

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

// 批量处理
router.post("/batch", function (req, res) {
    var delIds = req.body.delete;
    if (delIds && delIds.length > 0) {
        var ids = [];
        delIds.forEach(function (item) {
            ids.push(mongoose.Types.ObjectId(item));
        });

        Todo.remove({_id: {$in: ids} }, function (err, result) {
            if (err)
                res.json({success: false, msg: err.message});
            else
                res.json({success: true, msg: "删除" + delIds.length + "条数据成功。"});
        });
    }
    else
        res.json({ success: true, msg: "没有指定数据。" });
});
module.exports = router;