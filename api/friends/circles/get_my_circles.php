<?php
	include("../../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			$sql_select = "SELECT c.CircleId, c.CircleName
							FROM circles c
							WHERE c.OwnerId = ?;";
 			$stmt = $conn->prepare($sql_select);
 			$stmt->execute(array($id));		
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			echo json_encode($return);
		} else {
			echo "no Id set";
		}
	}
?>