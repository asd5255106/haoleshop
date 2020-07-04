<?php
include_once "../config.php";

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

$sql = "SELECT * FROM `user` WHERE username = '$username'";

$r = mysqli_query($db,$sql);

if(mysqli_num_rows($r) > 0){
    echo '{"status":"error","msg":"该用户已经存在，请重新填写注册的昵称!!"}';
}else{
    $res = "INSERT INTO user " .
      "(user_id,username,password)" .
      "VALUES " .
      "(NULL,'$username','$password')";
  
    $retval = mysqli_query($db,$res);
  
    if (!$retval) {
      die('无法插入数据: ' . mysqli_error($conn));
    }
  
    echo '{"status":"success"}';
}

?>