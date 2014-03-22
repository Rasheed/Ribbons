<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['userId'], $_GET['viewId'])) {
			$user = $_GET['userId'];
			$view = $_GET['viewId'];
			if($view==''){
				$sql_select = "SELECT DISTINCT(a.Id), a.Name
							FROM albums a
							WHERE a.UserId = ?;";
 				$stmt = $conn->prepare($sql_select);
 				$stmt->execute(array($user));		
				$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
				echo json_encode($return);
			} else {
				$sql_select = "SELECT * 
						   FROM circlemembers c, circlemembers d, friendship f
						   WHERE (f.UserId1=? AND f.UserId2=?) OR (c.UserId=? AND d.UserId=? AND c.CircleId=d.CircleId);";
 				$stmt = $conn->prepare($sql_select);
 				$stmt->execute(array($user, $view), $user, $view);		
				$return = $stmt->fetchAll(PDO::FETCH_ASSOC);
				if(count($return)==0){
					$sql_select = "SELECT DISTINCT(a.Id), a.Name
							FROM albums a
							WHERE a.UserId = ? AND a.AccessRights='Public';";
 					$stmt = $conn->prepare($sql_select);
 					$stmt->execute(array($view));		
					$result = $stmt->fetchAll(PDO::FETCH_ASSOC); 
					echo json_encode($result);
				} else {
					$sql_select = "SELECT DISTINCT(a.Id), a.Name
							FROM albums a
							WHERE a.UserId = ?;";
 					$stmt = $conn->prepare($sql_select);
 					$stmt->execute(array($view));		
					$result = $stmt->fetchAll(PDO::FETCH_ASSOC); 
					echo json_encode($result);
				}
			}
		} else {
			echo "no Id set";
		}
	}
?>