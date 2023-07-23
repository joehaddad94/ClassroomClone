<?php 

include('connection.php');

$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];
if(isset($_POST['user_id']) && $_POST['class_id']!=""){
    $query = $mysqli->prepare('SELECT users.first_name, users.last_name, users.email
    FROM users
    JOIN roles ON users.role_id = roles.role_id
    JOIN classes ON classes.user_id = users.user_id
    WHERE classes.class_id = ? AND users.user_id = ?');
    $query->bind_param('ii', $class_id,$user_id);
    $query->execute();
    $result = $query->get_result();
    $response = array();
    if($result ->num_rows >0){
     while ($row = $result->fetch_assoc()) {
        $response[] = $row;
          }
        }
    }else {
    $response['message'] = 'not found';
}
echo json_encode($response);

?>