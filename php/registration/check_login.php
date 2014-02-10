<?php
include("../database.php");
$DB = new Database();
$conn = $DB->init();
echo json_encode($_POST);
<<<<<<< HEAD
if(isset($_POST['username'], $_POST['password'])) {
//AboutMe, Birthday, FirstName, LastName, Email, Password, Gender)
=======
/*if($_POST['action'] == "check_login") {
#AboutMe, Birthday, FirstName, LastName, Email, Password, Gender)
>>>>>>> 8504ed664fad8b135f402280acdb6c9f48f8fb99
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql_select = "SELECT Id FROM users WHERE Email = '$username' AND Password = '$password'";
  $stmt = $conn->query($sql_select);
  $users = $stmt->fetchAll(); 
  if(count($users) == 1){
	$data = array("isUser" => "true");                                                                    
	echo json_encode($data);
  }
}else {
	$data = array("isUser" => "false");                                                                    
	echo json_encode($data);
}
//mysqli_close($conn);j
?>