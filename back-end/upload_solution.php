<?php
include('connection.php');

$solution_text = $_POST['solution_text'];
$turnin_date = $_POST['turnin_date'];
$assignment_id = $_POST['assignment_id'];
$user_id = $_POST['user_id'];

$query = $mysqli->prepare('INSERT INTO solutions (solution_text, turnin_date, assignment_id, user_id) VALUES (?, ?, ?, ?)');
$query->bind_param('ssii', $solution_text, $turnin_date, $assignment_id, $user_id);

if ($query->execute()) {
    echo "Topic saved successfully!";
} else {
    echo "Error: " . $query->error;
}