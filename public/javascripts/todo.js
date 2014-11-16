$(function () {
    BindTodo();

    $('#ulTodo').delegate('span', 'click', function () {
        ChangeStatus($(this).parent().attr('data-id'));
    }).delegate('a', 'click', function () {
        Remove($(this).parent().attr('data-id'));
    });
});

// 绑定Todo
function BindTodo() {
    $.ajax({
        url: '/ajax/todo',
        success: function (result) {
            if (result && result.success) {
                var list = result.list;
                if (list) {
                    var html = '';
                    $.each(list, function (i, item) {
                        html += '<li ' + (item.Finished ? 'class="finished"' : '') + ' data-id="' + item._id + '">' +
                            '<a>&times;</a>' +
                            '<span>' + item.Name + '</span>' +
                            '</li>';
                    });
                    $('#ulTodo').html(html);
                }
            }
        }
    });
}

// 改变Todo状态
function ChangeStatus(id) {
    $.ajax({
        url: '/ajax/todo/modify',
        type: 'post',
        data: {id: id},
        success: function (result) {
            if (result && result.success) {
                alert(result.msg);
                BindTodo();
            }
            else {
                alert(result.msg);
            }
        }
    });
}

// 移除Todo
function Remove(id) {
    $.ajax({
        url: '/ajax/todo/delete',
        type: 'post',
        data: {id: id},
        success: function (result) {
            if (result && result.success) {
                BindTodo();
            }
            else {
                alert(result.msg);
            }
        }
    });
}