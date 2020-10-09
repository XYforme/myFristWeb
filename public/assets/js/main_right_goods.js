var categoryid = getUrlParams('id');
$('#gtype').val(categoryid);
// var categoryid = 'fushi';
// 当表单发生提交行为的时候
$('#parentForm').on('submit', '#uploadForm', function() {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串 

    // 获取用户输入的商品名称
    var nickName = $('#nickName').val();
    var price = $('#price').val();
    var sum = $('#sum').val();
    var sales = $('#sales').val();
    var link = $('#link').val();
    // 判断用户是否输入了商品名称
    if (nickName.trim().length == 0) {
        alert('请输入商品名称')
        return;
    }
    if (price.trim().length == 0) {
        alert('请输入商品价格');
        return;
    }
    if (sum.trim().length == 0) {
        alert('请输入商品总量');
        return;
    }
    if (sales.trim().length == 0) {
        alert('请输入商品销量');
        return;
    }
    if (link.trim().length == 0) {
        alert('请输入商品链接');
        return;
    }
    var formData = $(this).serialize();
    // 向服务器端发送添加商品的请求
    $.ajax({
            type: 'post',
            url: '/goods',
            data: formData,
            success: function(response) {
                // 刷新页面
                location.reload();
                // console.log(response)
            },
            error: function() {
                alert('商品添加失败')
            }
        })
        // 阻止表单的默认提交行为
    return false;

});

// 当用户选择文件的时候
$('#parentForm').on('change', '#avatar', function() {
        // console.log(this.files[0]);
        var formData = new FormData();
        formData.append('avatar', this.files[0]);

        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            // 告诉$.ajax方法不要解析请求参数
            processData: false,
            // 告诉$.ajax方法不要设置请求参数的类型
            contentType: false,
            success: function(response) {
                // console.log(response)
                // 实现头像预览功能
                $('#preview').attr('src', response[0].avatar);
                $('#gpath').val(response[0].avatar)
            }
        })
    })
    //向服务器发送分页请求
$.ajax({
    type: 'get',
    url: '/goods',
    data: {
        category: categoryid
    },
    success: function(response) {
        console.log(response);
        var html = template('goodsTpl', { data: response.records });
        $('#gtable').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});

//向服务器端传送删除请求
$('#gtable').on('click', '.dlt', function() {
    if (confirm('您真的要进行删除操作吗')) {
        // 获取到管理员要删除的文章的id
        var id = $(this).attr('data-id');
        // console.log(id);
        // 向服务器端发送请求 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/goods/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})

// 分页
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/goods',
        data: {
            page: page,
            category: categoryid
        },
        success: function(response) {
            var html = template('goodsTpl', { data: response.records });
            $('#gtable').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
}

var modifyId = '';
$('#gtable').on('click', '.upd', function() {
    // 获取到管理员要修改的文章的id
    var id = $(this).attr('data-id');
    modifyId = id;
    // console.log(id);
    // 向服务器端发送请求 获取要修改的商品信息
    $.ajax({
        type: 'get',
        url: '/goods/' + id,
        success: function(response) {
            console.log(response)
            var html = template('modifyTpl', response);
            $('#parentForm').html(html);

        }
    })
})

// 当表单发生提交行为的时候
$('#parentForm').on('submit', '#modifyForm', function() {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串 
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
            type: 'put',
            url: '/goods/' + modifyId,
            data: formData,
            success: function(response) {
                // 刷新页面
                location.reload();
                // console.log(response)
            },
            error: function() {
                alert('商品修改失败')
            }
        })
        // 阻止表单的默认提交行为
    return false;
});