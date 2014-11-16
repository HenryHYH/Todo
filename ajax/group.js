var express = require('express'),
    router = express.Router(),
    Group = require('../models/group');

// 获取所有数据
router.get('/', function (req, res) {
    Group.find(function (err, list) {
        res.json({success: true, data: list});
    });
});

// 保存数据
router.post('/save', function (req, res) {
    var group = new Group({Name: req.param('name')});
    group.save(function (err) {
        if (err) {
            res.json({success: false, msg: err.message});
        }
        else {
            res.json({success: true});
        }
    });
});

module.exports = router;