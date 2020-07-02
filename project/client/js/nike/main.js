console.log("加载成功")

require.config({
    paths: {
        "jquery":"../jquery-3.4.1",
        "index":"../index/index",
        "nike":"nike"
    }
})

require(["index","nike"],function(index,nike) {
    index.showName();
    index.exit();
    index.gotoTop();
    index.navMove();

    nike.loginFirst();
    nike.creatNike();
})