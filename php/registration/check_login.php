<?php
include("../database.php");
$DB = new Database();
$conn = $DB->init();
if($_POST['action'] == "check_login") {
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  $sql_select = "SELECT Id FROM users WHERE Email = '$username' AND Password = '$password'";
  $stmt = $conn->query($sql_select);
  $users = $stmt->fetchAll(); 
  echo json_encode($users);
}
?>