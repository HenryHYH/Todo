var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
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
            },
            query: {Finished: false}
        };
        Todo.mapReduce(o, function (err, result) {
            for (var i in result) {
                for (var j in list) {
                    if (result[i]._id.toString() == list[j]._id.toString()) {
                        list[j]._doc.Count = result[i].value;
                        break;
                    }
                }
            }
            console.log(list);

            res.json({success: true, data: list});
        });
    });
});

// 获取单条数据
router.get("/:id", function (req, res) {
    var groupId = req.param("id");

    Group.findById(groupId, function (err, result) {
        Todo.count({GroupId: mongoose.Types.ObjectId(groupId), Finished: false}, function (err, cnt) {
            result._doc.Count = cnt;
            res.json({success: true, data: result});
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