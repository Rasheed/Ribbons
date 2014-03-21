<?php
	include("../../php/database.php");
	include("../../php/log.php");

	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id1'],$_GET['id2'])) {
			$id1 = $_GET['id1'];
			$id2 = $_GET['id2'];
			$sql_select = "SELECT FriendshipId, CreationDate FROM friendship WHERE UserId1 = ? AND UserId2 = ? LIMIT 1;";
 			$stmt = $conn->prepare($sql_select);
 			$stmt->execute(array($id1,$id2));	
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			if(count($return)>0){
				$return[0]["isFriend"] = True; 
			} else {
				$return[0]["isFriend"] = False; 	
			}
			echo json_encode($return[0]);
			$log = new log($id1);
			$log->a($id1." viewed ".$id2."'s profile.");
		} else {
			echo "no Id set";
		}
	}
?>