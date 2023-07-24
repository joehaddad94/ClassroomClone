<?php
include('connection.php');
$class_id = $_POST['class_id'];

if ($_POST['class_id'] != "") {
    $query = $mysqli->prepare('SELECT googlemeet_link FROM classes WHERE classes.class_id = ?');
    $query->bind_param('i', $class_id);
    $query->execute();
    $result = $query->get_result();
    $response = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $response[] = $row['googlemeet_link'];
        }
    } else {
        $response['message'] = 'There is no link for this class';
    }
} else {
    $response['message'] = 'There is no link for this class';
}

echo json_encode($response);
?>