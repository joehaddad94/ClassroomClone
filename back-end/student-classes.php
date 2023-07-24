<?php
include('connection.php');

$user_id = $_POST['user_id'];

if ($_POST['user_id'] != "") {
    $query = $mysqli->prepare('SELECT classes.* 
    FROM classes
    JOIN enroll ON enroll.class_id = classes.class_id 
    JOIN users ON enroll.user_id = users.user_id 
    WHERE enroll.user_id=?');
    $query->bind_param('i', $user_id);
    $query->execute();
    $result = $query->get_result();
    $response = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
    } else {
        $response['message'] = 'not found';
    }
} else {
    $response['message'] = 'not found';
}

echo json_encode($response);
?>