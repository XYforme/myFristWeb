var myDate = new Date();
//获取日期与时间
//myDate.toLocaleString(); 
// console.log(myDate.toLocaleDateString());
var current = document.querySelector('#current');
var currentTime = document.querySelector('#currentTime');
var timesubmit = document.querySelector('#timesubmit');
var dbtime = document.querySelector('#dbtime');
current.innerHTML = myDate.toLocaleDateString();
currentTime.innerHTML = myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();

setInterval(function() {
    var myDate = new Date();
    currentTime.innerHTML = myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();
    // alert('hello');
}, 1000);

timesubmit.onclick = function() {
    var inputTime = $('#inputTime').val();
    // 判断用户是否输入了商品名称
    if (inputTime.trim().length == 0) {
        alert('请输入新的秒杀时间');
        return;
    }
    var formData = $(inputForm).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
            type: 'post',
            url: '/putsktime',
            data: formData,
            success: function(response) {
                // 刷新页面
                location.reload();
                // console.log(response)
            },
            error: function() {
                alert('秒杀时间添加失败')
            }
        })
        // 阻止表单的默认提交行为
    return false;
}

$.ajax({
    type: 'get',
    url: '/getsktime',
    success: function(response) {
        // console.log(response);
        dbtime.innerHTML = response[0].skTime;

    }
})