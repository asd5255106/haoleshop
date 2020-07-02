define(["jquery"], function ($) {

    function loginFirst() {
            let uesr_name = localStorage.getItem("user_name") || "";
            console.log(uesr_name)
            $(".prolist-main").on("click", ".gl-btn", function () {
                if (uesr_name == "") {
                    console.log(123);

                    alert("请您先登录")
                    location.href = "./login.html";
                } /* else {
                location.href = "cart.html"
            } */
            })
    }


    function creatNike() {
        $.ajax({
            type: "post",
            url: "../../server/NIKE/nike.php",
            dataType: "json",
        }).done(data => {
            new Nike(data);
        })


        class Nike {
            constructor(data) {
                this.data = data;
                this.list = null;
                this.init();
            }
            init() {
                this.creatUI();
            }
            creatUI() {

                let lis = Array.from(this.data).map((item, idx) =>
                    `
            <li class="gl-item" data-id="${idx}">
                <div class="gl-wrap">
                    <div class="gl-img">
                        <a href="javascript:;">
                            <img src="${JSON.parse(item.src).srcA}"
                                alt="" class="pdImg">
                        </a>
                    </div>
                    <p class="gl-name">
                        <a href="javascript:;"> ${item.name}</a>
                    </p>
                    <p class="gl-price">
                        ￥
                        <span class="okprice">${item.price}</span>
                        <span class="oksale">(<em>${item.sale}</em>)</span>
                        <span class="market-price">${item.marketPrice}</span>
                    </p>
                    <div id="gl-btn">
                        <input type="button" class="gl-btn" value="加入购物车">
                    </div>
                </div>
            </li>`).join("")

                this.list = $(`
            <ul class="clear_fix">
                ${lis}
            </ul>`)

                $(".prolist-main").append(this.list)
            }
        }
    }

    return {
        loginFirst: loginFirst,
        creatNike: creatNike
    }
});