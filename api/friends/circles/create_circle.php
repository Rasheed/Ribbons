<?php
	include("../../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['id'],$_POST['name'])) {
			$id = $_POST['id'];
			$name = $_POST['name'];
			$sql_insert = "INSERT INTO circles (OwnerId, CircleName, CreationDate) VALUES (?,?,NOW());";
 			$stmt = $conn->prepare($sql_insert);
 			$stmt->execute(array($id, $name));		
			$out = array("circleCreated" => True); 
			echo json_encode($out);
		} else {
			echo "no Id set";
		}
	}
?>