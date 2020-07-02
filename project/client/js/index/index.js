define(["jquery"], function ($) {

    
    // 显示用户名
    function showName() {
        $(() => {
            let uesr_name = localStorage.getItem("user_name") || "";
            if (uesr_name) {
                console.log(uesr_name)
                $(".logined").css("display", "block").next().css("display", "none")
                $(".logined .name").text(`${uesr_name}:欢迎您`)
            }
        })
    }
    // 退出用户
    function exit() {
        $(".logined .logout").click(function () {
            $(".unlogin").css("display", "block").prev().css("display", "none")
            localStorage.removeItem("user_name")
        })
    }

    // 头部固定导航条
    function moveTop() {
        var offset = $(".nnav").offset();
        var top = offset.top;
        $(document).scroll(function () {
            // console.log(top)

            if ($(document).scrollTop() >= top) {
                $('.nnav').addClass('fixed-on')
            } else {
                $(".nnav").removeClass('fixed-on')
            }
        });
    }

    // gotoTop
    function gotoTop() {
        $(window).scroll(function () {
            let scrollTop = document.documentElement && document.documentElement.scrollTop;

            if (scrollTop !== 0) {
                $("#gotoTop").css("display", "block")
            } else {
                $("#gotoTop").css("display", "none")
            }
        });
    }

    // 导航栏滑动
    function navMove() {
        $(() => {
            $(".nnav .hassub").mouseenter(function () {
                console.log(123);
                var g = $(this);
                var e = g.find("a").attr("class").substr(5, 1);
                var f = g.closest(".nnav").find(".jsnav" + e);
                f.addClass("nlihover").siblings(".navvsub").removeClass("nlihover")
            }).mouseleave(function () {
                var g = $(this);
                var e = g.find("a").attr("class").substr(5, 1);
                var f = g.closest(".nnav").find(".jsnav" + e);
                f.removeClass("nlihover")
            });
            $("body").delegate(".navvsub", "mouseenter", function () {
                var e = $(this);
                e.addClass("nlihover")
            }).delegate(".navvsub", "mouseleave", function () {
                var e = $(this);
                e.removeClass("nlihover")
            })
        })
    }

    function creatBrand() {
        $.ajax({
            type: "post",
            url: "http://localhost/haoleshop-copy/project/server/index/brandin.php",
            dataType: "json",
        }).done(data => {
            new Brand(data);
        })

        class Brand {
            constructor(data) {
                this.data = data;
                this.brand = null;
                this.init();
            }
            init() {
                this.creatUI();
            }
            creatUI() {
                let brandImg = this.data.map(item => `
            <a href="javascript:;">
                        <img src=${item.src} alt="">
            </a>`).join("")

                this.brand = $(`
        <div class="brand">
            <div class="w1200">
                <p>
                    <img src="http://0.js.al.okbuycdn.com/resources/images/v6/index/ad_7.png" alt="">
                </p>
                <div class="brandin">
                    <div class="brandinin">
                        ${brandImg}
                    </div>
                </div>
            </div>
    </div>`)

                $(".brandin-wrap").append(this.brand);
            }
        }
    }

    function creatList() {

        $.ajax({
            type: "post",
            url: "http://localhost/haoleshop-copy/project/server/index/list2.php",
            dataType: "json",
        }).done(data => {
            new List(data);
        })

        class List {
            constructor(data) {
                this.data = data;
                this.list = null;
                this.init();
            }
            init() {
                this.creatUI()
            }
            creatUI() {
                let lists = this.data.map(item => `
        <li>
            <a href="javascript:;">
                <img src="${item.src}" alt="">
                <span class="tit1">${item.tit1}</span>
                <span class="tit2">${item.tit2}</span>
                <span class="tit3">${item.tit3}</span>
            </a>
        </li>`)

                this.list = $(`
        <div class="list2 w1200">
            <div class="list2in">
                <ul id="indexhtml2">
                    ${lists}
                </ul>
            </div>
        </div>`)

                $(".list-wrap").append(this.list);
            }
        }

    }

    function creatList2() {

        $.ajax({
            type: "post",
            url: "http://localhost/haoleshop-copy/project/server/index/list3.php",
            dataType: "json",
        }).done(data => {
            new List2(data);
        })

        class List2 {
            constructor(data) {
                this.data = data;
                this.list2 = null;
                this.init();
            }
            init() {
                this.creatUI()
            }
            creatUI() {
                let lis = this.data.map(item => `
        <li>
            <a href="javascript:;">
                <img src=${item.src} alt="">
                <p class="list3tit1">
                    ${item.tit1}
                    <span>${item.tit2}</span>
                </p>
            </a>
        </li>`).join("")

                this.list2 = $(`
        <div class="list3in">
            <ul id="indexhtml3">
                ${lis}
            </ul>
        </div>`)

                $(".list3").append(this.list2);
            }
        }
    }


    return {
        showName: showName,
        exit: exit,
        gotoTop: gotoTop,
        moveTop:moveTop,
        navMove: navMove,
        creatBrand: creatBrand,
        creatList: creatList,
        creatList2: creatList2
    }

})
