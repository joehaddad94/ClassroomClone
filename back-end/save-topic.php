<?php
include('connection.php');


$topic_name = $_POST['topic_name'];
$class_id = $_POST['class_id'];



$query = $mysqli->prepare('INSERT INTO topics (topic_name,class_id) VALUES (?, ?)');
$query->bind_param('si', $topic_name, $class_id);

if ($query->execute()) {
    echo "Topic saved successfully!";
} else {
  
    echo "Error: " . $query->error;
}