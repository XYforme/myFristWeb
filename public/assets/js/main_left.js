$(".box li").click(function() {
    $(this).addClass("current").siblings().removeClass();
    // alert("hello");
})