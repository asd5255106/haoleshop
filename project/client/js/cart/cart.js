define(["jquery"], function ($) {

    // loadCart();

    // function loadCart() {
    //     $.ajax({ //获取商品数据
    //         data: {id: localStorage.getItem("user_id") },
    //         url: "http://localhost/haoleshop/project/server/cart/delete.php",
    //         dataType: "json",
    //         success: function(res) {
    //             console.log(res);

    //             // $(res.data).each((index, ele) => {
    //             //     renderUI(ele);
    //             // })
    //         }
    //     });
    // }

    function getCart() {

        // console.log(123)
        let user_id = localStorage.getItem("user_id") || "";
        // let user_name = localStorage.getItem("user_name") || "";

        $.ajax({
            url: "http://localhost/haoleshop/project/server/cart/getCart.php",
            data: { user_id },
            dataType: "json"
        }).done(data => {
            // data = dataTool(data);
            // renderUI(data);
            // console.log(data);

            new creatCart(data)
            // let html = ""
            // let tdHtml = data.map(item => {
            //     return `
            //             <td width="110">
            //                     <input type="checkbox" class="checkbox">
            //                 </td>
            //                 <td width="470">
            //                     <a href="javascript:;">
            //                         <img src="${item.src.srcA}" alt="" class="img">
            //                         <strong>${item.name}</strong>
            //                         <small>
            //                             尺码：
            //                             <i>40</i>
            //                         </small>
            //                     </a>
            //                 </td>
            //                 <td width="110">
            //                     ￥${item.price}
            //                 </td>
            //                 <td width="240">
            //                     <!-- 数量控制器 -->
            //                     <ul>
            //                         <li>
            //                             <span class="reduce">-</span>
            //                         </li>
            //                         <li>
            //                             <label>
            //                                 <input type="text" maxlength="1" readonly value="${item.num}">
            //                             </label>
            //                         </li>
            //                         <li>
            //                             <span class="add">+</span>
            //                         </li>
            //                         <li></li>
            //                     </ul>
            //                 </td>
            //                 <td width="110">
            //                     <span class="pr">
            //                         ￥
            //                         <pr>${item.num * item.price}</pr>
            //                     </span>
            //                     <br>
            //                 </td>
            //                 <td>
            //                     <span class="wish">
            //                         <i>收藏</i>
            //                     </span>
            //                     <span class="delete">
            //                         <i>删除</i>
            //                     </span>
            //             </td>`

            // }).join("");

            // let tbHtml = `<tbody>
            //                         <tr>
            //                             ${tdHtml}
            //                         </tr>
            //                 </tbody>`

            // html += tbHtml;

            // $(html).append(".cartlistin");

        })

        class creatCart {
            constructor(data) {
                this.data = data;
                this.cart = null;
                this.init()
            }
            init() {
                this.creatUI()
            }
            creatUI() {
                let tdHtml = Array.from(this.data).map(item =>
                    // console.log(JSON.parse(item.src).srcA)
                    `
                    <tbody gid=${item.good_id}>
                    <tr>
                    <td width="110">
                                 <span class="checkbox"></span>
                             </td>
                             <td width="470">
                                 <a href="javascript:;">
                                     <img src="${JSON.parse(item.src).srcA}" alt="" class="img">
                                     <strong>${item.name}</strong>
                                     <small>
                                         尺码：
                                         <i>40</i>
                                     </small>
                                 </a>
                             </td>
                             <td width="110" class="price">
                                 ￥${item.price}
                             </td>
                             <td width="240">
                                 <!-- 数量控制器 -->
                                 <ul>
                                     <li>
                                         <span class="reduce">-</span>
                                     </li>
                                     <li>
                                         <label>
                                             <input type="text" readonly value="${item.num}" class="sum">
                                         </label>
                                     </li>
                                     <li>
                                         <span class="add">+</span>
                                     </li>
                                     <li></li>
                                 </ul>
                             </td>
                             <td width="110">
                                 <span class="pr">
                                     ￥
                                     <pr>${item.num * item.price}</pr>
                                 </span>
                                 <br>
                             </td>
                             <td>
                                 <span class="wish">
                                     <i>收藏</i>
                                 </span>
                                 <span class="delete">
                                     <i>删除</i>
                                 </span>
                         </td>
                         </tr>
                </tbody>
                `
                ).join("")

                this.cart = $(`
                
                        ${tdHtml}
                       
                `)

                $(".cartlistin table").append(this.cart)
            }
        }
    }

    function all() {
        $(".all").click(function () {
            // console.log(123);
            if ($(".checkboxall").hasClass("allcur")) {
                $(".checkboxall").removeClass("allcur")
                $(".cartlistin").find(".checkbox").removeClass("cur");
            } else {
                $(".checkboxall").addClass("allcur");
                $(".cartlistin").find(".checkbox").addClass("cur");
            }

            // if(!$(".checkbox",this).hasClass("cur")){
            //     $(".cartlistin").find(".checkbox").addClass("cur");
            // }
            // $(".cartlistin").find(".checkbox").toggleClass("cur");
            computedTotal()
        })

        $(".cartlistin").on("click", ".checkbox", function () {
            $(this).toggleClass("cur");
            // console.log($(this).parents(".cartlistin").find("tbody").length)
            let num = $(this).parents(".cartlistin").find("tbody").filter(function () {
                return $(".checkbox", this).hasClass("cur") == true
            })
            if (num.length == $(this).parents(".cartlistin").find("tbody").length) {
                $(".checkboxall").addClass("allcur");
            } else {
                $(".checkboxall").removeClass("allcur");
            }

            computedTotal()
        })
    }

    // 数量控制器
    function addNum() {
        $(".cartlistin").on("click", ".reduce,.add", function () {
            // 减
            let price = $(this).parents("tbody").find(".price").text().trim().slice(1) * 1
            let dNum = null;
            if (this.className == "reduce") {
                dNum = $(this).parent().next().find(".sum").val() * 1 - 1
                if (dNum > 0) {
                    $(this).parent().next().find(".sum").val(dNum)
                } else {
                    alert("不能再减啦")
                    dNum = 1
                }
                console.log(dNum);
            }
            if (this.className == "add") {
                dNum = $(this).parent().prev().find(".sum").val() * 1 + 1
                    $(this).parent().prev().find(".sum").val(dNum)

            }
            // console.log(dNum);
            

            // 修改小计
            $(this).parents("tbody").find(".pr pr").text(dNum * price)
            // 获取商品id
            let gid = $(this).parents("tbody").attr("gid")
            // 发送请求
            updateCartData(this.className, gid, localStorage.getItem("user_id"),dNum)

            computedTotal()
            addNumCart()
        })

        // 添加购物车数量
        function addNumCart() {
            let user_id = localStorage.getItem("user_id") || "";
            $.ajax({
                url: "http://localhost/haoleshop/project/server/cart/getCart.php",
                data: { user_id },
                dataType: "json"
            }).done(data => {
                console.log(data);
                let total = 0
                data.forEach(item => {
                    total += item.num * 1;
                })
                console.log(total);

                $(".c .cart span b").text(total)

            })
        }
        // 封装发送请求
        function updateCartData(flag, good_id, user_id,num) {
            $.ajax({
                url: "http://localhost/haoleshop/project/server/cart/cart.php",
                data: {
                    flag,
                    good_id,
                    user_id,
                    num
                }
            }).done(data => {
                console.log(data);

            })
        }
    }

    // 计算
    function computedTotal() {
        let total_count = 0;
        let total_price = 0;
        $(".cartlistin tbody").each((index, ele) => {
            // console.log($(ele).find("input[type='checkbox']").next().hasClass("mark"));
            // console.log(ele);

            if ($(".checkbox", ele).hasClass("cur")) {

                let count = $(ele).find(".sum").val() * 1;
                let price = $(ele).find(".price").text().trim().slice(1) * 1;

                // console.log( $(ele).find(".price").text().trim().slice(1));

                total_count += count;
                total_price += count * price;
            }

        });

        $("#total_num").text(total_count);
        $("#total_last_all").text(total_price.toFixed(2));
        $("#total_price").text(total_price)
    }

    // 删除
    function deleteCart(){
        $(".cartlistin").on("mouseenter",".wish,.delete",function(){
            // console.log(123);
            
            if(this.className =="wish"){
                $(this).addClass("wishhover")
            }
            if(this.className == "delete"){
                $(this).addClass("deletecur")
            }
        })
        $(".cartlistin").on("mouseleave",".wish,.delete",function(){
            // console.log(this);
            
            if($(this).hasClass("wish")){
                $(this).removeClass("wishhover")
            }
            if($(this).hasClass("delete")){
                $(this).removeClass("deletecur")
            }
        })
        $(".cartlistin").on("click",".delete",function(){
            // console.log(123);
            let good_id = $(this).parents("tbody").attr("gid");
            if(confirm("您确定要删除吗？删除就没有了哦")){
                $.ajax({
                    url: "http://localhost/haoleshop/project/server/cart/delete.php",
                    data: { good_id, id: localStorage.getItem("user_id") },
                    dataType: "json",
                    success: function(response) {
                        location.href = "./cart.html"

                        // loadCart();
                    }
                });
        }
            
        })
    }



    return {
        getCart: getCart,
        all: all,
        addNum: addNum,
        deleteCart:deleteCart
    }
})