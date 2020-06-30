$(() => {
    /* 图形验证码 */
    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 2, //线条数量
        // dotR: 200, //点的半径
        // dotNum: 1000, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 40, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'stroke', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        console.log('验证码', r);
        imgCode = r;

        /* 自动触发标签的事件 */
        $("#validateCodeDiv_1").trigger("blur");
    });

    // (1) 正则校验
    // (2) 事件处理(表单)
    // (3) 图形验证码
    /* 思路：给输入框添加事件(失去焦点)监听，当失去焦点的时候，应该获取输入框的内容进行正则校验 */
    let options = {
        "username": {
            reg: `/^[a-zA-Z]{2,6}$/.test(val)`,
            msg: "请输入2-10位的正确用户名"
        },
        "password": {
            reg: `/^[a-zA-Z0-9]{3,6}$/.test(val)`,
            msg: "密码不符合规范"
        },
        "validatecode": {
            reg: "val == imgCode",
            msg: "图形验证码不正确"
        }
    }

    $(".registerRight input").blur(function() {
        let option_id = this.id;
        // console.log("option_id", options[option_id]);

        let val = $.trim($(this).val());
        // console.log(val)

        // if (eval(options[option_id].reg)) {
        //     $(this).next().text("");
        // } else {
        //     $(this).next().text(options[option_id].msg);
        // }
    })
})