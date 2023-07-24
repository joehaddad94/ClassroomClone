<?php
include('connection.php');

$topic_name = $_POST['topic_name'];

$checkQuery = $mysqli->prepare('select topic_id from topics where topic_name = ?');
$checkQuery->bind_param('s', $topic_name);
$checkQuery->execute();
$checkResult = $checkQuery->get_result();


if ($checkResult->num_rows > 0) {
    echo "Error: Topic already exists!";
} else {
    $insertQuery = $mysqli->prepare('insert into topics (topic_name) values (?)');
    $insertQuery->bind_param('s', $topic_name);

    if ($insertQuery->execute()) {
        echo "Topic saved successfully!";
    } else {
        echo "Error: " . $insertQuery->error;
    }
}