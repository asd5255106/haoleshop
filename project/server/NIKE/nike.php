<?php

include_once "../config.php";

$sql = "SELECT * FROM nike";
$r = mysqli_query($db,$sql);

$data = mysqli_fetch_all($r,MYSQLI_ASSOC);

echo json_encode($data);
?>