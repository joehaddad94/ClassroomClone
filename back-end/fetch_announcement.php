<?php

include('connection.php');

$class_id = $_POST['class_id'];


$query = $mysqli->prepare('SELECT * FROM announcements JOIN classes ON announcements.class_id = classes.class_id  WHERE classes.class_id = ? ORDER BY announcement_id DESC');
$query->bind_param('i', $class_id);
$query->execute();

$result = $query->get_result();

$response = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    $response['message'] = 'Class not found for the specified class id';
}

echo json_encode($response);

?>
