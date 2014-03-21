<?php
	include("../../php/database.php");
	include("../../php/log.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['id1'],$_POST['id2'])) {
			$id1 = $_POST['id1'];
			$id2 = $_POST['id2'];
			$sql_insert = "INSERT INTO friendship (UserId1, UserId2, CreationDate) VALUES (?,?, NOW()); INSERT INTO friendship (UserId1, UserId2, CreationDate) VALUES (?,?, NOW());";
 			$stmt = $conn->prepare($sql_insert);
 			$stmt->execute(array($id1,$id2,$id2,$id1));	
			echo "asdasd";
			$out = array("friendAdded" => True); 
			echo json_encode($out);
			$log = new log($id1);
			$log->a("Became friends with ".$id2);
		} else {
			echo "no Id set";
		}
	}
?>