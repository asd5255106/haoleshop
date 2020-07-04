define(["jquery"], function ($) {

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

                let lis = Array.from(this.data).map((item) =>
                    `
            <li class="gl-item" data-id="${item.good_id}">
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

    function addCart() {
        $(".prolist-main").on("click", ".gl-btn", function () {
            let user_id = localStorage.getItem("user_id") || "";
            let user_name = localStorage.getItem("user_name") || "";
            let good_id = $(this).parents(".gl-item").attr("data-id");

            // console.log(good_id,user_id,user_name)
            // if (uesr_name == "") {
            //     console.log(123);

            //     alert("请您先登录")
            //     location.href = "./login.html";
            // } else {
            //     alert("加入购物车成功")
            // }

            if (user_id && user_name) {
                /* 发请求，执行添加到购物车 */
                $.ajax({
                    url: "http://localhost/haoleshop/project/server/cart/addCart.php",
                    data: { user_id, good_id }
                }).done(data => {
                    console.log("返回值:", data);
                    alert("加入成功")
                    addNumCart()
                })
    
            } else {
                /* 跳转去登录 */
                alert("请您先登录")
                location.href = "./login.html";
            }
        })
    }

    // 添加购物车数量
    function addNumCart(){
        let user_id = localStorage.getItem("user_id") || "";
        $.ajax({
            url:"http://localhost/haoleshop/project/server/cart/getCart.php",
            data:{user_id},
            dataType:"json"
        }).done(data => {
            // console.log(data);
            let total = 0
            data.forEach(item => {
                total += item.num * 1;
            })
            // console.log(total);

            $(".c .cart span b").text(total)
            
        })
    }

    return {
        addCart: addCart,
        creatNike: creatNike,
        addNumCart:addNumCart
    }
});