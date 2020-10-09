window.addEventListener('load', function() {
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    // 节流阀  互斥锁 
    var tflag = true;
    // 1.显示隐藏电梯导航
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();

        } else {
            $(".fixedtool").fadeOut();

        };
    }

    $(window).scroll(function() {
        toggleTool();
        // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名


        if (tflag) {
            $(".dianti").each(function(i, ele) {
                if ($(document).scrollTop() >= ($(ele).offset().top) - 200) {
                    //console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();

                }
            })
        }



    });
    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
        tflag = false;
        // console.log($(".fixedtool li").length);
        // console.log($(this).index());
        if ($(this).index() == ($(".fixedtool li").length) - 1) {
            $("body, html").stop().animate({
                scrollTop: 0
            }, function() {
                tflag = true;
            });
            return;
        }

        // console.log($(this).index());
        // 当我们每次点击小li 就需要计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $(".dianti").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            tflag = true;
        });
        // $("body, html").stop().scrollTop(current);
        // tflag = true;
        // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
        $(this).addClass("current").siblings().removeClass();


    })

    //倒计时
    // 1. 获取元素 
    var hour = document.querySelector('.hour'); // 小时的黑色盒子
    var minute = document.querySelector('.minute'); // 分钟的黑色盒子
    var second = document.querySelector('.second'); // 秒数的黑色盒子
    var dbtime = '';
    $.ajax({
        type: 'get',
        url: '/getsktime',
        success: function(response) {
            // console.log(response);
            dbtime = response[0].skTime;

        }
    });

    var inputTime = +new Date(dbtime); // 返回的是用户输入时间总的毫秒数
    countDown(); // 我们先调用一次这个函数，防止第一次刷新页面有空白 
    // 2. 开启定时器
    setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
        var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
        var h = parseInt(times / 60 / 60 % 24); //时
        h = h < 10 ? '0' + h : h;
        hour.innerHTML = h; // 把剩余的小时给 小时黑色盒子
        var m = parseInt(times / 60 % 60); // 分
        m = m < 10 ? '0' + m : m;
        minute.innerHTML = m;
        var s = parseInt(times % 60); // 当前的秒
        s = s < 10 ? '0' + s : s;
        second.innerHTML = s;
    }
})

// 向服务器端发送请求 索要banner数据
$.ajax({
    type: 'get',
    url: '/banner',
    success: function(response) {
        // console.log(response)
        var html = template('bannerTpl', { data: response });
        $('#bannertpl').html(html);
        var html2 = template('bannerTpl2', { data: response });
        $('#bannertpl2').html(html2);
        //    Initialize Swiper
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            // spaceBetween: 30,
            loop: true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper 
            observeParents: true, //修改swiper的父元素时，自动初始化swiper 

            autoplay: {
                disableOnInteraction: false, //手动滑动之后不打断播放
                delay: 2000
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // console.log($('#bannertpl2').html());
        // console.log(html2);
        // console.log($('#bannertpl').html());
    }
})

//向服务器发送查询服饰请求
$.ajax({
    type: 'get',
    url: '/goods/category/' + 'fushi',

    success: function(response) {
        // console.log(response);
        var html = template('goodsTpl', { data: response });
        $('#fushitpl').html(html);
    }
});

//向服务器发送查询电器请求
$.ajax({
    type: 'get',
    url: '/goods/category/' + 'dianqi',

    success: function(response) {
        // console.log(response);
        var html = template('goodsTpl', { data: response });
        $('#dianqitpl').html(html);

    }
});

//向服务器发送查询零食请求
$.ajax({
    type: 'get',
    url: '/goods/category/' + 'tiandian',
    success: function(response) {
        // console.log(response);
        var html = template('goodsTpl', { data: response });
        $('#tiandiantpl').html(html);

    }
});