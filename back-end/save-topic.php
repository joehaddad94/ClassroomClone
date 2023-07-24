<?php
include('connection.php');

$class_id = $_POST['class_id'];
$topic_name = $_POST['topic_name'];

$query = $mysqli -> prepare('insert into topics (topic_name, class_id) values (?, ?)');
$query->bind_param('si', $topic_name, $class_id);
$query->execute();
if ($query->execute()) {
    echo "Topic saved successfully!";
} else {
    echo "Error: " . $query->error;
}