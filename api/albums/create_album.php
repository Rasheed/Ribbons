<?php
	include("../../php/database.php");
	include("../../php/log.php");
	$DB = new Database();
	$conn = $DB->getConn();

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['id'],$_POST['name'])) {
			$id = $_POST['id'];
			$name = $_POST['name'];
			$access = $_POST['accessright'];
			$sql_insert = "INSERT INTO albums (UserId, Name, CreationDate, AccessRights) VALUES (?,?,NOW(), ?);";
 			$stmt = $conn->prepare($sql_insert);
 			$stmt->execute(array($id, $name, $access));		
			$out = array("circleCreated" => True); 	
			echo json_encode($out);
			$log = new log($id);
			$log->a("Created an album \"".$name."\"");
		} else {
			echo "no Id set";
		}
	}
?>