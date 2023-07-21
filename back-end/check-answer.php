<?php
include('connection.php');
$user_id=$_POST['user_id'];
$answer=$_POST['answer'];
$email=$_POST['email'];

$query=$mysqli->prepare('select user_id, first_name,last_name,email,answer
 from users 
 where user_id=? and answer=? and email=?');
 $query->bind_param('iss',$user_id,$answer,$email);
 $query->execute();
 $query->store_result();
 $query->bind_result($user_id,$first_name,$last_name,$email,$answer);
 $query->fetch();
 $num_rows=$query->num_rows();
 if($num_rows==0){
    $response['answer_check']="Your answer is not true!";
 }
 else{
    $response['answer_check']="Your answer is right!";
    $response['right_answer']=$answer;
    $response['email']=$email;
 }
echo json_encode($response);

