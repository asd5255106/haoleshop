$(() => {
    $(".login_new_tabhead span").click(function(){
        // console.log($(this).index())
        $(this).addClass("active").siblings().removeClass("active")
    })

    // 登录按钮
    $(".login_btn_2").click(function(){
        let username = $.trim($("#username").val());
        let password = md5($.trim($("#password").val())).slice(0, 15)

        /* 先检查用户名和密码和是否勾选，都满足则发请求 */
        if (username.length == 0) {
            alert("用户名不能为空");
            return
        }

        if (password.length == 0) {
            alert("密码不能为空");
            return;
        }

        // $.ajax({
        //     type: "post",
        //     url: "../../server/resgiter/login.php",
        //     data: `username=${username}&password=${md5(password).slice(0,15)}`,
        //     dataType: "json",
        // }).done(data => {
        //     console.log(data)
        //     if(data.status == "success"){
        //         alert(data.msg)
        //         /* (1) 要把用户的id和名字保存起来 */
        //         localStorage.setItem("user_id", data.data.userId);
        //         localStorage.setItem("user_name", username);
        //         location.href = "../../index.html";
        //     }else{
        //         alert(data.msg)
        //         location.href = "../html/register.html"
        //     }
        // })

        $.ajax({
            type: "post",
            url: "../../server/resgiter/login.php",
            data: { username, password },
            dataType: "json",
        }).done(data => {
            console.log(data);
            if (data.status == "success") {
                /* ..登录成功.. */
                /* (1) 要把用户的id和名字保存起来 */
                localStorage.setItem("user_id", data.data.userId);
                localStorage.setItem("user_name", data.data.username);

                /* (2) 跳转回登录页 */
                location.href = "../../index.html";
            } else {
                alert(data.data.msg);
                location.href = "../html/register.html"
            }
        })
    })
})