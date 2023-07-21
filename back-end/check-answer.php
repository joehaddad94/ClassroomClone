<?php
include('connection.php');

$answer=$_POST['answer'];
$email=$_POST['email'];

$query=$mysqli->prepare('select first_name,last_name,email,answer
 from users 
 where answer=? and email=?');
 $query->bind_param('ss',$answer,$email);
 $query->execute();
 $query->store_result();
 $query->bind_result($first_name,$last_name,$email,$answer);
 $query->fetch();
 $num_rows=$query->num_rows();
 if($num_rows==0){
    $response['answer_check']="Wrong answer";
 }
 else{
    $response['answer_check']="Right answer";
    
 }
echo json_encode($response);

