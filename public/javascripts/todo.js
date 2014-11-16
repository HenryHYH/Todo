$(function () {
    BindGroup();
    $(document).delegate("#add-group-name", "keyup", function (event) {
        if (event.keyCode == 13)
            SaveGroup();
    }).delegate("#add-group", "click", SaveGroup)
        .delegate("#add-task-name", "keyup", function (evetn) {
            if (event.keyCode == 13)
                SaveTodo();
        });

    $("#group-list").delegate("a", "click", function () {
        var cur = $(this);
        SelectGroup(cur.attr("data-group-id"));

        cur.parent().addClass("active").find("i").removeClass("fa-folder-o").addClass("fa-folder-open-o").end()
            .siblings(".active").removeClass("active").find("i").removeClass("fa-folder-open-o").addClass("fa-folder-o");
    });

    $("#task-list").delegate("li", "click", function () {
        SelectTodo($(this));
    }).delegate("input[type='checkbox']", "click", function (e) {
        ChangeTodoStatus($(this));
        e.stopPropagation();
    });
});

// 绑定Group
function BindGroup(groupId) {
    $.ajax('/ajax/group', {
        success: function (result) {
            if (result && result.success && result.data.length > 0) {
                if (groupId)
                    result.groupId = groupId;
                else
                    result.groupId = result.data[0]._id;

                $("#group-list").html(template('group-item', result));
                SelectGroup();
            }
        }
    });
}

// 保存Group
function SaveGroup() {
    var txt = $("#add-group-name"),
        name = txt.val();

    if (name) {
        $.ajax('/ajax/group/save', {
            type: 'post',
            data: {name: name},
            success: function (result) {
                txt.val('');
                BindGroup();
            }
        });
    }
}

// 选择分组
function SelectGroup(groupId) {
    if (!groupId)
        groupId = $("#group-list li.active a").attr("data-group-id");

    $.ajax('/ajax/todo/groupid', {
        data: {groupid: groupId},
        success: function (result) {
            $("#task-list").html(template('task-item', result));
        }
    });
}

// 保存todo
function SaveTodo() {
    var txt = $("#add-task-name"),
        name = txt.val(),
        groupId = $("#group-list li.active a").attr("data-group-id");

    $.ajax('/ajax/todo/save', {
        type: 'post',
        data: {name: name, groupid: groupId},
        success: function (result) {
            if (result && result.success) {
                txt.val('');
                // BindGroup(groupId);
                SelectGroup(groupId);
            }
            else {
                alert(result.msg);
            }
        }
    });
}

// 选择todo
function SelectTodo($curLi) {
    $curLi.toggleClass("selected");
}

// 改变todo状态
function ChangeTodoStatus(ctrl) {
    var finished = ctrl.prop('checked');

    $.ajax('/ajax/todo/changestatus', {
        type: 'post',
        data: {finished: finished, taskid: ctrl.attr('data-item-id')},
        success: function (result) {
            if (result && result.success) {
                //SelectGroup();
                ctrl.parent().toggleClass('finished');
            }
            else
                alert(result.msg);
        }
    });
}