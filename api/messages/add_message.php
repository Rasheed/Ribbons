<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	$date = date('Y-m-d H:i:s');

	if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
		$sql_insert = "INSERT INTO messages (toUserId, fromUserId, Content, CreationDate, Type) VALUES (?,?,?,?,?);";
 		$stmt = $conn->prepare($sql_insert);
 		$stmt->execute(array($_GET['to'], $_GET['from'], $_GET['content'], $date, $_GET['type']));
 		$data = array("message_sent" => true); 
		echo json_encode($data);
	}
?>