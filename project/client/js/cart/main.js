console.log("加载成功");


require.config({
    paths:{
        "jquery":"../jquery-3.4.1",
        "index":"../index/index",
        "cart":"cart",
        "nike":"../nike/nike"
    }
})

require(["index","cart","nike"],function(index,cart,nike) {
    index.showName();
    index.exit();
    index.navMove();

    cart.getCart();
    cart.all();
    cart.addNum();
    cart.deleteCart();

    nike.addNumCart();
})