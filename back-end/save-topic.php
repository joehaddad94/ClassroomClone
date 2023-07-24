<?php
include('connection.php');

$topic_name = $_POST['topic_name'];

<<<<<<< HEAD
$query = $mysqli -> prepare('insert into topics (topic_name) values (?)');
$query->bind_param('s',$topic_name);
if ($query->execute()) {
    echo "Topic saved successfully!";
=======
$checkQuery = $mysqli->prepare('select topic_id from topics where topic_name = ?');
$checkQuery->bind_param('s', $topic_name);
$checkQuery->execute();
$checkResult = $checkQuery->get_result();


if ($checkResult->num_rows > 0) {
    echo "Error: Topic already exists!";
>>>>>>> f17466e37f8f772cbf8bd28ae9dffc39d1aa3a26
} else {
    $insertQuery = $mysqli->prepare('insert into topics (topic_name) values (?)');
    $insertQuery->bind_param('s', $topic_name);

    if ($insertQuery->execute()) {
        echo "Topic saved successfully!";
    } else {
        echo "Error: " . $insertQuery->error;
    }
}