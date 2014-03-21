<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'],$_GET['groupId'],$_GET['type'])) {
			$id = $_GET['id'];
			$gid = $_GET['groupId'];
			$type = $_GET['type'];
			$sql_select = "SELECT u.FirstName , u.LastName , m.Content, m.CreationDate
						   FROM messages m, users u
						   WHERE m.toUserId= ? AND m.fromUserId=u.Id AND m.Type = ?
						   ORDER BY CreationDate DESC;";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($gid, $type));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($return);
		} else {
			echo "no Id set";
		}
	}
?>