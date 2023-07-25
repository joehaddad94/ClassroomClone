<?php
include('connection.php');

$class_id = $_POST['class_id'];

$query = $mysqli->prepare('select * 
from classes 
where class_id =?');
$query->bind_param("i", $class_id);
$query->execute();

$result = $query->get_result();

    $response = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
    } else {
        $response['status'] = 'No classes found';
    }

    echo json_encode($response);
