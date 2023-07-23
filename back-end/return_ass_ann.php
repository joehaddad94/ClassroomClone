<?php 

include('connection.php');

$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];

$query = $mysqli->prepare('SELECT announcements.description, assignments.title, assignments.instructions, assignments.due_date
FROM classes
JOIN announcements ON classes.class_id = announcements.class_id
JOIN assignments ON classes.class_id = assignments.class_id
JOIN users ON assignments.user_id = users.user_id
WHERE classes.class_id = ? AND users.user_id = ?');
$query->bind_param('ii', $class_id,$user_id);
$query->execute();

$result = $query->get_result();

$response = array();

if($result ->num_rows >0){
 while ($row = $result->fetch_assoc()) {
    $response[] = $row;
      }
} else {
    $response['message'] = 'Assignment and announcements are not found for the specified user & class id';
}

echo json_encode($response);

?>



