<?php
include('connection.php');

$class_name = $_POST['class_name'];
$section = $_POST['section'];
$subject = $_POST['subject'];
$room = $_POST['room'];
$class_code = $_POST['class_code'];
$googlemeet_link = $_POST['googlemeet_link'];
$class_code = $_POST['class_code'];
$user_id = $_POST['user_id'];

<<<<<<< HEAD
$query = $mysqli->prepare('insert into classes(class_name, section, subject, room, class_code, googlemeet_link, user_id) value(?,?,?,?,?,?,?)');
$query->bind_param('ssssssi', $class_name, $section, $subject, $room, $googlemeet_link, $class_code, $user_id);
=======
$query = $mysqli->prepare('insert into classes(class_name, section, subject, room,class_code, googlemeet_link, user_id) value(?,?,?,?,?,?,?)');
$query->bind_param('ssssssi', $class_name, $section, $subject, $room, $class_code, $googlemeet_link, $user_id);
>>>>>>> 27a34f81c9af9f8b30ac2b17bba2857031ab9424

$response = array();

if ($query->execute()) {
    $response['Status'] = "Success";
} else {
    $response['Status'] = "Failed: " . $mysqli->error;
}

echo json_encode($response);