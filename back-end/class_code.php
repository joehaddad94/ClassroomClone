<?php
include('connection.php');

$class_code = $_POST['class_code'];

$query = $mysqli->prepare('INSERT INTO enroll (class_id, user_id)
SELECT class_id, user_id
FROM classes
WHERE class_code = ?');
$query->bind_param('s',  $class_code);

$response = array();

if ($query->execute()) {
    if ($query->affected_rows > 0) {
        $response['Status'] = "Success";
    } else {
        $response['Status'] = "Failed: class_code not found";
    }
} else {
    $response['Status'] = "Failed: " . $mysqli->error;
}

echo json_encode($response);
