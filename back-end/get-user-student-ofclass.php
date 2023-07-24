<?php
include('connection.php');

$class_id = $_POST['class_id'];

if ($_POST['class_id'] != "") {
    $query = $mysqli->prepare('SELECT users.first_name, users.last_name 
    FROM users 
    JOIN enroll ON enroll.user_id = users.user_id 
    JOIN classes ON enroll.class_id = classes.class_id 
    WHERE enroll.class_id = ? AND users.role_id = 1');
    $query->bind_param('i', $class_id);
    $query->execute();
    $result = $query->get_result();
    $response = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
            
        }
        $response['num_rows'] = $result->num_rows;
    } else {
        $response['message'] = 'not found';
    }
} else {
    $response['message'] = 'not found';
}

echo json_encode($response);
?>