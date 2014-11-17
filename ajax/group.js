var express = require('express'),
    router = express.Router(),
    Group = require('../models/group'),
    Todo = require('../models/todo');

// 获取所有数据
router.get('/', function (req, res) {
    Group.find(function (err, list) {
        var o = {
            map: function () {
                emit(this.GroupId, 1);
            },
            reduce: function (k, val) {
                var total = 0;
                for (var i = 0; i < val.length; i++) {
                    total += val[i];
                }
                return total;
            }
        };
        Todo.mapReduce(o, function (err, result) {
            for (var i in result) {
                for (var j in list) {
                    if (result[i]._id.toString() == list[j]._id.toString()) {
                        //.Count = result[i].value;
                        break;
                    }
                }
            }
            console.log(list);

            res.json({success: true, data: list});
        });
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