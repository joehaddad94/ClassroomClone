<?php
include('connection.php');
$user_id=$_POST['user_id'];
$email=$_POST['email'];
$new_password=$_POST['new_password'];
$check_user=$mysqli->prepare('select user_id from users where user_id=? and email=?');
$check_user->bind_param('is',$user_id,$email);
$check_user->execute();
$check_user->store_result();
$username_exists = $check_user->num_rows();
if($username_exists==1){
    $hashed_new_password=password_hash($new_password,PASSWORD_BCRYPT);
    $query=$mysqli->prepare('update users set password=? where user_id=? and email=?');
    $query->bind_param('sis',$hashed_new_password,$user_id,$email);
    $query->execute();

    $response['status']="succes";
    $response['message']="the password was updated successfully!";
    
}
else{
    $response['status']="failure"; 
}
echo json_encode($response);
?>