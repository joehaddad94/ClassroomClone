<?php
include('connection.php');

$solution_text = $_POST['solution_text'];
$turned_in = $_POST['turned_in'];
$assignment_id = $_POST['assignment_id'];
$user_id = $_POST['user_id'];

$query = $mysqli->prepare('INSERT INTO solutions (solution_text, turned_in, assignment_id, user_id) VALUES (?, ?, ?, ?)');
$query->bind_param('ssii', $solution_text, $turned_in, $assignment_id, $user_id);

if ($query->execute()) {
    echo "Topic saved successfully!";
} else {
    echo "Error: " . $query->error;
}