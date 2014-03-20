<?php
	include("../../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['id'], $_POST['circleid'])) {
			$id = $_POST['id'];
			$circleid = $_POST['circleid'];
			$sql_delete = "DELETE FROM circlemembers
						   WHERE UserId=? AND CircleId = ?;";
			$stmt = $conn->prepare($sql_delete);
			$stmt->execute(array($id,$circleid));
			echo "success";
		} else {
			echo "no Id set";
		}
	}
?>