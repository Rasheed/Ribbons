<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			$sql_select = "SELECT DISTINCT u.Id, u.FirstName, u.LastName, u.Email, u.CurrentProfilePhoto, u.CurrentRibbonPhoto
							FROM friendship f, users u
							WHERE f.UserId1 IN (
								SELECT f2.UserId2
								FROM friendship f2
								WHERE f2.UserId1 = ?
							) AND f.UserId2 <> ?
							  AND f.UserId2 = u.Id";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id, $id));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			echo json_encode($return);
		} else {
			echo "no Id set";
		}
	}
?>