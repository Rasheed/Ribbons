<?php
	include("../../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if(isset($_POST['id'], $_POST['name'], $_POST['course'], $_POST['startdate'], $_POST['enddate']) {
		  $id = $_POST['id'];
		  $name = $_POST['name'];
		  $course = $_POST['course'];
		  $startdate = $_POST['startdate'];
		  $enddate = $_POST['enddate'];		  
		  $sql_insert = "INSERT INTO users (Email,Password,FirstName,LastName,Gender,Birthday) VALUES (?,?,?,?,?,?);";
		  $stmt = $conn->prepare($sql_insert);
		  $stmt->execute(array($email, $password, $first_name, $last_name, $gender, $birthday));
		  echo "success";
		  return;
		}
	}
?>