<?php
	include("../../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['circleid'])) {
			$id = $_GET['circleid'];
			$sql_select = "SELECT u.Id, U.FirstName, u.LastName, u.Email, c.CircleName, u.RibbonPicture, u.ProfilePicture
							FROM circlemembers cm, users u, circles c
							WHERE cm.CircleId = ? AND cm.UserId = u.Id AND cm.CircleId = c.CircleId
							";
 			$stmt = $conn->prepare($sql_select);
 			$stmt->execute(array($id));		
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			echo json_encode($return);
		} else {
			echo "no Id set";
		}
	}
?>