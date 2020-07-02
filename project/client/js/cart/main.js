console.log("加载成功");


require.config({
    paths:{
        "jquery":"../jquery-3.4.1",
        "index":"../index/index",
        // "cart":"cart"
    }
})

require(["index"],function(index) {
    index.showName();
    index.exit();
    index.navMove();
})