<?php
include('connection.php');

$class_id = $_POST['class_id'];

$query = $mysqli->prepare('SELECT topic_id, topic_name FROM topics WHERE class_id = ?');
$query->bind_param('i', $class_id);
$query->execute();

$result = $query->get_result();

$response = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    $response['message'] = 'No topics';
}

echo json_encode($response);

?>