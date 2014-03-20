<?php
	include("../../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['id'],$_POST['circleId'])) {
			$id = $_POST['UserId'];
			$circleId = $_POST['circleId'];
			$sql_insert = "INSERT INTO circlemembers (CircleId, UserId) VALUES (?,?);";
 			$stmt = $conn->prepare($sql_insert);
 			$stmt->execute(array($id, $circleId));		
			$out = array("joinedCircle" => True); 
			echo json_encode($out);
		} else {
			echo "no Id set";
		}
	}
?>