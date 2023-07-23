<?php

include('connection.php');


if(isset($_POST["new_first_name"]) && $_POST["new_last_name"] != ""){
    $new_first_name=$_POST['new_first_name'];
    $new_last_name=$_POST['new_last_name'];

    $query = "update users set first_name = ?, last_name = ?";
    
    $response = $mysqli->prepare($query);
    $response->bind_param("ssi", $new_first_namex , $new_last_namex);

    if ($response->execute()) {
        echo "Profile updated successfully!";
    } else {
        echo "Error updating profile: " . $response->error;
    }
}