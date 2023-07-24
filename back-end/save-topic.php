<?php
include('connection.php');

$topic_name = $_POST['topic_name'];

$query = $mysqli -> prepare('insert into topics (topic_name) values (?)');
$query->bind_param('s',$topic_name);
if ($query->execute()) {
    echo "Topic saved successfully!";
} else {
    echo "Error: " . $query->error;
}