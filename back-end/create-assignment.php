<?php
include('connection.php');

$title = $_POST['title'];
$instructions = $_POST['instructions'];
$launch_date = $_POST['launch_date'];
$due_date = $_POST['due_date'];
$attachment_id = $_POST['attachment_id'];
$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];
$topic_id = $_POST['topic_id'];
$grade_id = $_POST['grade_id'];

$query = $mysqli->prepare('insert into assignments(title, instructions, launch_date, due_date, attachment_id, class_id, user_id, topic_id, grade_id) value(?,?,?,?,?,?,?,?,?)');
$query->bind_param('ssssiiiii', $title, $instructions, $launch_date, $due_date, $attachment_id, $class_id, $user_id, $topic_id, $grade_id);

$response = array();

if ($query->execute()) {
    $response['Status'] = "Success";
} else {
    $response['Status'] = "Failed: " . $mysqli->error;
}

echo json_encode($response);