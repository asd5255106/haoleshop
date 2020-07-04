<?php

include_once "../config.php";


$id = $_REQUEST["user_id"];

$good_id = $_REQUEST["good_id"];
$sign = $_REQUEST["flag"];
$num = $_REQUEST["num"];

  if($sign == "add"){
    $plusSql = "UPDATE `cart` SET `num`= $num WHERE `good_id`=$good_id AND user_id=$id";
    mysqli_query($db,$plusSql);
  }elseif($sign == "reduce"){
    $reduceSql = "UPDATE `cart` SET `num`= $num WHERE `good_id`=$good_id AND user_id=$id";
   
    mysqli_query($db,$reduceSql);
  }
  echo json_encode(array("status"=>"success"), true);
?>