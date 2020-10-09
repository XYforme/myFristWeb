// 当表单发生提交行为的时候
$('#uploadForm').on('submit', function() {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
            type: 'post',
            url: '/banner',
            data: formData,
            success: function(response) {
                // 刷新页面
                location.reload();
                // console.log(response)
            },
            error: function() {
                alert('banner添加失败')
            }
        })
        // 阻止表单的默认提交行为
    return false;
});

// 当用户选择文件的时候
$('#avatar').on('change', function() {
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
            $('#bpath').val(response[0].avatar)
        }
    })
})

// 向服务器端发送请求 索要banner数据
$.ajax({
    type: 'get',
    url: '/banner',
    success: function(response) {
        // console.log(response)
        var html = template('bannerTpl', { data: response });
        $('#btable').html(html);
    }
})

//向服务器端传送删除请求
$('#btable').on('click', '.dlt', function() {
    if (confirm('您真的要进行删除操作吗')) {
        // 获取到管理员要删除的文章的id
        var id = $(this).attr('data-id');
        // console.log(id);
        // 向服务器端发送请求 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/banner/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})