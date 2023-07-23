<?php

include('connection.php');


if(isset($_POST["new_first_name"]) && $_POST["new_last_name"] != "" && $_POST["user_id"] != ""){
    $new_first_namex=$_POST['new_first_name'];
    $new_last_namex=$_POST['new_last_name'];
    $user_idx=$_POST['user_id'];
    $query = $mysqli->prepare('update users set first_name=?,last_name=? where user_id=?');
    $query->bind_param('ssi', $new_first_namex,$new_last_namex,$user_idx);
    $query->execute();
    $response["success"] = "you made it ".$user_idx." -". $new_first_namex." ! ";
    $response["message"]="successfully connected!";
    $response["new_fname"]=$new_first_namex;
    $response["new_lname"]=$new_last_namex;
      
    echo json_encode($response);
    return;
}else{
    $response['message'] = "error";    
    return; 
}

