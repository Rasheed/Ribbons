<?php
include("../database.php");
$DB = new Database();
$conn = $DB->init();
echo json_encode($_POST);
if(isset($_POST['username'], $_POST['password'], $_POST['first_name'], $_POST['last_name'], $_POST['gender'], $_POST['about_me'])) {
//AboutMe, Birthday, FirstName, LastName, Email, Password, Gender)
  $username = $_POST['username'];
  $password = $_POST['password'];
  $first_name = $_POST['first_name'];
  $last_name = $_POST['last_name'];
  $about_me = $_POST['about_me'];
  /*$sql_select = "SELECT Id FROM users WHERE Email = '$username' AND Password = '$password'";
  $stmt = $conn->query($sql_select);
  $users = $stmt->fetchAll(); 
  echo json_encode($users);*/
  echo "if";
}
?>