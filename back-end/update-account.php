<?php

include('connection.php');

if (isset($_POST["user_id"]) && isset($_POST["new_first_name"]) && $_POST["new_last_name"] != "") {
    $user_id = $_POST["user_id"];
    $new_first_name = $_POST['new_first_name'];
    $new_last_name = $_POST['new_last_name'];
    $response = array();

    $query = $mysqli->prepare('UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?');

    $query->bind_param('ssi', $new_first_name, $new_last_name, $user_id);

    if ($query->execute()) {
        $response["success"] = "You made it, " . $new_first_name . "!";
        $response["message"] = "Successfully updated!";
    } else {
        $response["error"] = "Failed: " . $mysqli->error;
    }

    echo json_encode($response);
} else {
    $response["error"] = "Invalid input data!";
    echo json_encode($response);
    return;
}
