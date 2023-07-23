<?php
include('connection.php');

$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];

$query = $mysqli->prepare('SELECT assignment_id, title, instructions, launch_date, due_date, attachment_id , class_id,
 user_id, topic_id , grade_id FROM assignments WHERE class_id = ? AND user_id = ?');
$query->bind_param('ii', $class_id, $user_id);
$query->execute();

$result = $query->get_result();

$response = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    $response['message'] = 'User not found for the specified class id';
}

echo json_encode($response);

?>