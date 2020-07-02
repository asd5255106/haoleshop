console.log("加载成功")

// 配置引入的JS模块路径
require.config({
    paths: {
        "jquery": "../jquery-3.4.1",
        "index": "index",
        "slider": "Slider copy",
        // "nike": "nike",
        // "move": "move"
    }
    // shim:{
    //     "captcha":{
    //         exports:"_"
    //     },
    //     "md5":{
    //         exports:"_"
    //     }

    // }
})


require(["index","slider"], function (index,slider) {
    index.showName();
    index.exit();
    index.gotoTop();
    index.moveTop();
    index.navMove();
    index.creatBrand();
    index.creatList();
    index.creatList2();

    slider.banner();
})