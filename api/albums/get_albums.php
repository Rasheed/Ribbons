<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['userId'], $_GET['viewId'])) {
			$user = $_GET['userId'];
			$view = $_GET['viewId'];
			$sql_select = "SELECT DISTINCT(a.Id), a.Name
							FROM albums a
							WHERE a.UserId = ?;";
 			$stmt = $conn->prepare($sql_select);
 			$stmt->execute(array($view));		
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			echo json_encode($return);
		} else {
			echo "no Id set";
		}
	}
?>