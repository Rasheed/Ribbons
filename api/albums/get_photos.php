<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['albumid'])) {
			$id = $_GET['albumid'];
			$sql_select = "SELECT Id, Path, Name, CreationDate
							FROM photos
							WHERE AlbumId = ?;";
 			$stmt = $conn->prepare($sql_select);
 			$stmt->execute(array($id));		
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			echo json_encode($return);
		} else {
			echo "no Id set";
		}
	}
?>