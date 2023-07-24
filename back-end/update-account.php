<?php

include('connection.php');

$user_id = $_POST["user_id"];
$new_first_name = $_POST['new_first_name'];
$new_last_name = $_POST['new_last_name'];

// Update the user information
$query = $mysqli->prepare('UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?');
$query->bind_param('ssi', $new_first_name, $new_last_name, $user_id);
$query->execute();

// Fetch the updated user data
$query2 = $mysqli->prepare('SELECT user_id, first_name, last_name, email, role_id FROM users WHERE user_id = ?');
$query2->bind_param('i', $user_id);
$query2->execute();

$result = $query2->get_result();
$user_data = $result->fetch_assoc();

$mysqli->close();

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