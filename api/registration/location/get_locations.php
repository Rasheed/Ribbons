<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->init();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		$sql_select = "SELECT LocationId, Location FROM locations";
		$stmt = $conn->query($sql_select);
		$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
		echo json_encode($return);
	}
?>