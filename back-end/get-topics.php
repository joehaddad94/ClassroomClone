<?php
include('connection.php');
// echo "connected successfully!";
$class_id = $_POST['class_id'];

if ($_POST['class_id'] != "") {
    $query = $mysqli->prepare('SELECT topic_name 
    FROM topics    
    JOIN classes ON classes.class_id = topics.class_id 
    WHERE topics.class_id = ?');
    $query->bind_param('i', $class_id);
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