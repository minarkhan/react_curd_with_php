<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$allPosts = mysqli_query($db_conn,"SELECT * FROM `posts`");
if(mysqli_num_rows($allPosts) > 0){
    $all_posts = mysqli_fetch_all($allPosts,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"users"=>$all_posts]);
}
else{
    echo json_encode(["success"=>0]);
}