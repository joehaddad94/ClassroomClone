<?php
include('connection.php');

$email=$_POST['email'];
$new_password=$_POST['new_password'];

$check_user=$mysqli->prepare('select user_id from users where email=?');
$check_user->bind_param('s',$email);
$check_user->execute();
$check_user->store_result();
$username_exists = $check_user->num_rows();

if($username_exists==1){
    $hashed_new_password=password_hash($new_password,PASSWORD_BCRYPT);
    $query=$mysqli->prepare('update users set password=? where email=?');
    $query->bind_param('ss',$hashed_new_password,$email);
    $query->execute();

    $response['status']="Success";
    $response['message']="Password was updated";
    
}
else{
    $response['status']="Failure"; 
}
echo json_encode($response);
?>