<?php
include('connection.php');
$description = $_POST['description'];
$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];



$query = $mysqli->prepare('insert into announcements(description,class_id,user_id) value(?,?,?)');
$query->bind_param('sii', $description,$class_id,$user_id);

$response = array();

if ($query->execute()) {
    $response['Status'] = "Success";
} else {
    $response['Status'] = "Failed: " . $mysqli->error;
}

echo json_encode($response);