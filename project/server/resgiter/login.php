<?php

include_once "../config.php";

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

// $sql = "SELECT * FROM `user` WHERE username = '$username'";

// $r = mysqli_query($db,$sql);

// $num = mysqli_num_rows($r);

// if($num == 1){
//     $data = mysqli_fetch_all($r,MYSQLI_ASSOC)[0];
//     // var_dump($data);
//     if($password === $data["password"]){
//         echo '{"status":"success","msg":"登录成功,即将返回首页"}';
//     }else{
//         echo '{"status":"error","msg":"密码不正确,请重新输入"}';
//     }
// }else{
//     echo '{"status":"error","msg":"该用户名不存在"}';
// }


# (2) 去数据库中查询看指定的用户名是否存在
$sql = "SELECT * FROM user WHERE username='$username'" ;
$result = mysqli_query($db,$sql);

$data = array("status"=>"","data"=>array("msg"=>""));
if(mysqli_num_rows($result) == 0)
{
  # (2-1) 如果不存在，那么就返回数据(登录失败，用户名不存在)
  $data["status"] = "error";
  $data["data"]["msg"] = "登录失败，用户名不存在";
}else{
  # (2-2) 如果用户名存在，接着检查密码
  $sql2 = "SELECT * FROM user WHERE username='$username'";
  $result = mysqli_query($db,$sql2);
  $res = mysqli_fetch_all($result, MYSQLI_ASSOC)[0];
  $pwd = $res["password"];
  if($password !=  $pwd)
  {
    # (2-2-1) 密码不正确，那么就返回数据(登录失败，密码错误)
    $data["status"] = "error";
    $data["data"]["msg"] = "登录失败，密码不正确！！！";
  }else
  {
    # (2-2-2) 密码正确，那么就返回数据(登录成功)
    $userId = $res["user_id"];
    $data["status"] = "success";
    $data["data"]["msg"] = "恭喜你，登录成功";
    $data["data"]["userId"] = $userId;
    $data["data"]["password"] = $password;
    $data["data"]["username"] = $username;
  }
}

# 最后，需要把结果以JSON数据的方式返回
echo json_encode($data,true);
?>