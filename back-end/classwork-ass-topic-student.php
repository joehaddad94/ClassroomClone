<?php
include('connection.php');
// echo "connected successfully!";
$class_id = $_POST['class_id'];

if ($_POST['class_id'] != "") {
    $query = $mysqli->prepare('SELECT topics.topic_name,assignments.title,assignments.instructions,assignments.due_date 
    FROM topics    
    JOIN classes ON classes.class_id = topics.class_id 
    JOIN assignments ON assignments.topic_id = topics.topic_id 
    WHERE topics.class_id = ?
    GROUP BY topics.topic_name');
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