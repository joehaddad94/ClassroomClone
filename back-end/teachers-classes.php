<?php
include('connection.php');

$user_id = $_POST['user_id'];

$query = $mysqli->prepare('SELECT classes.* 
FROM classes 
JOIN users ON classes.user_id = users.user_id WHERE users.user_id = ?');
$query->bind_param('s', $user_id);
$query->execute();


$result = $query->get_result();

$response = array();

while ($row = $result->fetch_assoc()) {
    $response[] = $row;
}

echo json_encode($response);
?>