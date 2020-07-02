$(() => {

    // 头部固定导航条
    
    var offset = $(".nnav").offset();
    var top = offset.top;
    $(document).scroll(function () {
        console.log(top)

        if ($(document).scrollTop() >= top) {
            $('.nnav').addClass('fixed-on')
        } else {
            $(".nnav").removeClass('fixed-on')
        }
    });
})