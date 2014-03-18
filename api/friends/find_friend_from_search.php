<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['searchField'])) {
			$searchField = $_GET['searchField'];
			$sql_select = "SELECT Id, CONCAT(FirstName, concat(' ', LastName)) as FullName 
							From users
							WHERE CONCAT(FirstName, concat(' ', LastName)) LIKE ?;";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($searchField));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			echo json_encode($return);
			} else {
				echo "no search field";
			}
	}
?>