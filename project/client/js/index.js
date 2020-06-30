$(() => {
    // 吸顶效果
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let moveTop = document.querySelector(".nnav").offsetTop();
    console.log(moveTop)

    if (scrollTop >= moveTop) {
        headdiv.style.position = "sticky";
        headdiv.style.top = "0px";
        headdiv.style.zIndex = "2";
    } else {
        headdiv.style.position = "static";
    }

    // 轮播图
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

})