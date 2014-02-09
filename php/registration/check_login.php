<?php
include("../database.php");
$DB = new Database();
$conn = $DB->init();
echo json_encode($_SERVER);
/*if($_POST['action'] == "check_login") {
#AboutMe, Birthday, FirstName, LastName, Email, Password, Gender)
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  $sql_select = "SELECT Id FROM users WHERE Email = '$username' AND Password = '$password'";
  $stmt = $conn->query($sql_select);
  $users = $stmt->fetchAll(); 
  echo count($users);
} else{
	echo "error";
}*/
?>