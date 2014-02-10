<?php
include("../database.php");
$DB = new Database();
$conn = $DB->init();
echo json_encode($_POST);
if(isset($_POST['username'], $_POST['password'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql_select = "SELECT Id FROM users WHERE Email = '$username' AND Password = '$password'";
  $stmt = $conn->query($sql_select);
  $users = $stmt->fetchAll(); 
  if(count($users) == 1){
	$data = array("isUser" => "true");                                                                    
	echo json_encode($data);
  }else {
	$data = array("isUser" => "false");                                                                    
	echo json_encode($data);
}
?>