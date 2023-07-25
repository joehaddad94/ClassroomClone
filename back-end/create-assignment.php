<?php
include('connection.php');

$title = $_POST['title'];
$instructions = $_POST['instructions'];
$launch_date = $_POST['launch_date'];
$due_date = $_POST['due_date'];
$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];

$instructions = isset($_POST['instructions']) ? $_POST['instructions'] : NULL;

// Check if attachment_id is set, otherwise set to NULL
$attachment_id = isset($_POST['attachment_id']) ? $_POST['attachment_id'] : NULL;

$topic_id = isset($_POST['topic_id']) ? $_POST['topic_id'] : NULL;


$grade_id = isset($_POST['grade_id']) ? $_POST['grade_id'] : NULL;

$query = $mysqli->prepare('INSERT INTO assignments(title, instructions, launch_date, due_date, attachment_id, topic_id, grade_id, class_id, user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)');
$query->bind_param('ssssiiiii', $title, $instructions, $launch_date, $due_date, $attachment_id, $topic_id, $grade_id, $class_id, $user_id);

$response = array();

if ($query->execute()) {
    $response['Status'] = "Success";
} else {
    $response['Status'] = "Failed: " . $mysqli->error;
}

echo json_encode($response);
