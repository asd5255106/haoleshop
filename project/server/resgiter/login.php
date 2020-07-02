<?php

include_once "../config.php";

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

$sql = "SELECT * FROM `user` WHERE username = '$username'";

$r = mysqli_query($db,$sql);

$num = mysqli_num_rows($r);

if($num == 1){
    $data = mysqli_fetch_all($r,MYSQLI_ASSOC)[0];
    // var_dump($data);
    if($password === $data["password"]){
        echo '{"status":"success","msg":"登录成功,即将返回首页"}';
    }else{
        echo '{"status":"error","msg":"密码不正确,请重新输入"}';
    }
}else{
    echo '{"status":"error","msg":"该用户名不存在"}';
}
?>