<?php
include('connection.php');

if(isset($_POST['user_id']) && isset($_POST['class_id'])){
    $user_id = $_POST['user_id'];
    $class_id = $_POST['class_id'];

    $query = $mysqli->prepare('SELECT title, instructions, launch_date, due_date, attachment_data, class_name, first_name, last_name, topic_name, grade 
                               FROM assignments ass 
                               INNER JOIN attachments att ON ass.attachment_id = att.attachment_id 
                               INNER JOIN classes cl ON ass.class_id = cl.class_id 
                               INNER JOIN users u ON ass.user_id = u.user_id 
                               INNER JOIN topics t ON ass.topic_id = t.topic_id 
                               WHERE ass.class_id = ? AND ass.user_id = ?');
    
    $query->bind_param('ii', $class_id, $user_id);
    $query->execute();
    $query->store_result();
    
    
        $query->bind_result($title, $instructions, $launch, $due, $attachment, $class, $fname, $lname, $topic, $grade);
        $query->fetch();
        
        // Do something with the retrieved data
        $response['message'] = "Assignments viewed successfully";
  
} else {
    $response = "An error has occurred while fetching the data";
}

echo json_encode($response);
?>