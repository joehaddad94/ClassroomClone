<?php
include('connection.php');

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select user_id,first_name,last_name,email,password,question,answer
from users 
where email=?');
$query->bind_param('s', $email);
$query->execute();


$query->store_result();
$query->bind_result($user_id, $first_name, $last_name, $email, $stored_password, $question, $answer);
$query->fetch();

$num_rows = $query->num_rows();
if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    if ($password === $stored_password) {
        $response['status'] = 'logged in';
        $response['user_id'] = $user_id;
        $response['first_name'] = $first_name;
        $response['last_name'] = $last_name;
        $response['last_name'] = $last_name;
        $response['question'] = $question;
        $response['answer'] = $answer;
        

    } else {
        $response['status'] = "wrong password";
    }
}
echo json_encode($response);


?>

