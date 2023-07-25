<?php
include('connection.php');
$class_id = $_POST['class_id'];

if ($_POST['class_id'] != "") {
    $query = $mysqli->prepare('SELECT assignments.assignment_id, topics.topic_name, assignments.title, assignments.instructions, assignments.due_date FROM topics JOIN classes ON classes.class_id = topics.class_id JOIN assignments ON assignments.topic_id = topics.topic_id WHERE topics.class_id = ? GROUP BY topics.topic_name, assignments.title');
    $query->bind_param('i', $class_id);
    $query->execute();
    $result = $query->get_result();
    $response = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $topic_name = $row['topic_name'];
            if (!isset($response[$topic_name])) {
                $response[$topic_name] = array();
            }
            $response[$topic_name][] = array(
                'assignment_id' => $row['assignment_id'],
                'title' => $row['title'],
                'instructions' => $row['instructions'],
                'due_date' => $row['due_date']
            );
        }
    } else {
        $response['message'] = 'not found';
    }
} else {
    $response['message'] = 'not found';
}

echo json_encode($response);
?>