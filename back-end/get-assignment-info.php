<?php
include("connection.php");

if (isset($_POST['assignment_id'])){
    $assignment_id=$_POST['assignment_id'];


    $query = $mysqli->prepare('SELECT title, 
                                    instructions, 
                                    launch_date, 
                                    due_date, 
                                    attachment_id, 
                                    class_id,
                                    user_id, 
                                    topic_id, 
                                    grade_id 
                                FROM assignments WHERE assignment_id = ?');
   $query->bind_param('i', $assignment_id);
   $query->execute();   
   $result = $query->get_result();   
   $response = array();   
   if ($result->num_rows > 0) {
       while ($row = $result->fetch_assoc()) {
           $response[] = $row;
       }
   } else {
       $response['message'] = 'an error has occured while fetching the information';
   }
   
   echo json_encode($response);
   




}




?>