<?php

include('connection.php');


if(isset($_POST["new_first_name"]) && $_POST["new_last_name"] != "" && $_POST["user_id"] != ""){
    $new_first_namex=$_POST['new_first_name'];
    $new_last_namex=$_POST['new_last_name'];
    $user_idx=$_POST['user_id'];
    $response["success"] = "you made it ".$user_idx." -". $new_first_namex." ! ";
    $response["message"]="successfully connected!";
    
    echo json_encode($response);
    return;
}else{
    $response = [];    
    return; 
}

