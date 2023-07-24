<?php
include('connection.php');

$email=$_POST['email'];

$check_user=$mysqli->prepare('select user_id from users where email=?');
$check_user->bind_param('s',$email);
$check_user->execute();
$check_user->store_result();
$username_exists = $check_user->num_rows();

if($username_exists==1){

    $response['status']="Success";
    
}
else{
    $response['status']="Failure"; 
}
echo json_encode($response);
?>