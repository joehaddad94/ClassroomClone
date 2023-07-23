<?php

include('connection.php');


if(isset($_POST["new_first_name"]) && $_POST["new_last_name"] != ""){
    $new_first_namex=$_POST['new_first_name'];
    $new_last_namex=$_POST['new_last_name'];
    $response["success"] = "you made it ". $new_first_namex." !";
    $response["message"]="successfully connected!";

    $query = "UPDATE users SET first_name = ?, last_name = ?";
    
    $response = $mysqli->prepare($query);
    $response->bind_param("ssi", $new_first_namex , $new_last_namex);
    if ($response->execute()) {
        echo "Profile updated successfully!";
    } else {
        echo "Error updating profile: " . $response->error;
    }


