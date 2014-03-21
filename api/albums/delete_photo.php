<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['id'])) {
			$id = $_POST['id'];
			$sql_delete = "DELETE FROM photos
						   WHERE Id = ?;";
			$stmt = $conn->prepare($sql_delete);
			$stmt->execute(array($id));
			echo "success";
		} else {
			echo "no Id set";
		}
	}
?>