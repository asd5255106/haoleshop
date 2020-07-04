<?php

include_once "../config.php";

$id = $_REQUEST["id"];
$good_id = $_REQUEST["good_id"];

$delSql = "DELETE FROM `cart` WHERE good_id = $good_id AND user_id=$id";

mysqli_query($db, $delSql);
echo json_encode(array("status" => "success"), true);
?>