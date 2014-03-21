<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['userId'], $_GET['viewId'])) {
			$user = $_GET['userId'];
			$view = $_GET['viewId'];
			$sql_select = "SELECT * 
						   FROM circlemembers c, circlemembers d, friendship f
						   WHERE (f.UserId1=? AND f.UserId2=?) OR (c.UserId=? AND d.UserId=? AND c.CircleId=d.CircleId);";
 			$stmt = $conn->prepare($sql_select);
 			$stmt->execute(array($view));		
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			echo json_encode(count($return));
		} else {
			echo "no Id set";
		}
	}
?>