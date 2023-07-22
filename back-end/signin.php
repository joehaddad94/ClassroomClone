<?php
include('connection.php');

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select user_id,first_name,last_name,email,password, answer, role_id
from users 
where email=?');
$query->bind_param('s', $email);
$query->execute();


$query->store_result();
$query->bind_result($user_id, $first_name, $last_name, $email, $hashed_password, $answer, $role_id);
$query->fetch();

$num_rows = $query->num_rows();
if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    if (password_verify($password, $hashed_password)) {
        $response['status'] = 'logged in';
        $response['user_id'] = $user_id;
        $response['first_name'] = $first_name;
        $response['last_name'] = $last_name;
        $response['email'] = $email;
        $response['answer'] = $answer;
        $response['role_id'] = $role_id;

    } else {
        $response['status'] = "wrong password";
    }
}
echo json_encode($response);


?>