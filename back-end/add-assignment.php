<?php
include('connection.php');

$class_id=$_POST['class_id'];

$query = $mysqli-> prepare('select * from assignments
join topics ON 
assignments.topic_id = topics.topic_id
where assignments.class_id = ? ');
$query->bind_param('i',$class_id);
$query->execute();
$result=$query->get_result();

$response=array();

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
    $response[] = $row;
    }
}

echo json_encode($response);