<?php
include('connection.php');


$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$answer = $_POST['answer'];
// $role_id = $_POST['role_id'];


$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

if ($email_exists == 0) {
    $hashed_password = password_hash($password,PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(first_name,last_name,email,password,answer) values(?,?,?,?,?)');
    $query->bind_param('sssss', $first_name,$last_name,$email,$hashed_password,$answer);
    $query->execute();

    $response['status'] = "success";
    $response['message'] = "another message in success";
} else {
    $response['status'] = "failed";
    $response['message'] = "another message in fail";
}


echo json_encode($response);
