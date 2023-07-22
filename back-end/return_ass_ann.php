<?php 

include('connection.php');

$class_id = $_POST['class_id'];

$query = $mysqli->prepare('SELECT announcements.description, assignments.title, assignments.instructions, assignments.due_date
FROM classes
JOIN announcements ON classes.class_id = announcements.class_id
JOIN assignments ON classes.class_id = assignments.class_id
WHERE classes.class_id =?');
$query->bind_param('i', $class_id);
$query->execute();

$result = $query->get_result();

$response = array();

while ($row = $result->fetch_assoc()) {
    $response[] = $row;
}

echo json_encode($response);





?>