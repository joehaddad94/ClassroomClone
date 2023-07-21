<?php

$host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "classroomclone_db";

$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);
if (!$mysqli) {
    die(' connection failed ');
}

?>
