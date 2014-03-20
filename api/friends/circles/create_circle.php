<?php
	include("../../../php/database.php");
	include("../../../php/log.php");
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
			$out['circleid'] = $conn->lastInsertId();
			$sql_insert = "INSERT INTO circlemembers (CircleId, UserId) VALUES (?,?);";
 			$stmt = $conn->prepare($sql_insert);
 			$stmt->execute(array($id, $out['circleid']));		
			echo json_encode($out);
			$log = new log($id);
			$log->a("Created a circle \"".$name."\"");
		} else {
			echo "no Id set";
		}
	}
?>