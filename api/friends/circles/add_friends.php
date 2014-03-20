<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['id1'],$_POST['id2'])) {
			$id1 = $_POST['id1'];
			$id2 = $_POST['id2'];
			$sql_insert = "INSERT INTO friendship (UserId1, UserId2) VALUES (?,?); INSERT INTO friendship (UserId1, UserId2) VALUES (?,?);";
 			$stmt = $conn->prepare($sql_insert);
 			$stmt->execute(array($id1,$id2,$id2,$id1));		
			$out = array("friendAdded" => True); 
			echo json_encode($out);
		} else {
			echo "no Id set";
		}
	}
?>