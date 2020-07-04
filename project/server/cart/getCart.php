<?php

include_once "../config.php";

$user_id = $_REQUEST["user_id"];

/* 多表查询 */
$sql = "SELECT cart.*,nike.name,nike.src,nike.price FROM cart , nike WHERE cart.good_id = nike.good_id AND user_id=$user_id";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);


?>