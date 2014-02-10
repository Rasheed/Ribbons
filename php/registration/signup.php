<?php
include("../database.php");
$DB = new Database();
$conn = $DB->init();
echo json_encode($_POST);
/*if(isset($_POST['username'], $_POST['password'])) {
AboutMe, Birthday, FirstName, LastName, Email, Password, Gender)
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  $sql_select = "SELECT Id FROM users WHERE Email = '$username' AND Password = '$password'";
  $stmt = $conn->query($sql_select);
  $users = $stmt->fetchAll(); 
  echo json_encode($users);
}
mysql_close($conn);*/
?>