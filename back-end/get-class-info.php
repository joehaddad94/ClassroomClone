<?php
include('connection.php') ;

$class_code = $_POST['class_code'];

$query = $mysqli->prepare('select  * 
from classes 
where class_code = ?');

    $query->bind_param('s', $class_code);
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
