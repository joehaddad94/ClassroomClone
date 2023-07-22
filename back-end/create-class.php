<?php
include('connection.php');

$class_id = $_POST['class_id'];
$class_name = $_POST['class_name'];
$section = $_POST['section'];
$subject = $_POST['subject'];
$room = $_POST['room'];
$googlemeet_link = $_POST['googlemeet_link'];
$user_id = $_POST['user_id'];

$create_class = $mysqli->prepare('select')