<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if(isset($_POST['username'], $_POST['password'])) {
	  $username = $_POST['username'];
	  $password = $_POST['password'];
	  $sql_select = "SELECT Id, UserLocationId, WorkplaceId, EducationId FROM users WHERE Email = ? AND Password = ?";
	  $stmt = $conn->prepare($sql_select);
	  $stmt->execute(array($username, $password));
	  $users = $stmt->fetchAll(PDO::FETCH_ASSOC); 
	  if(count($users) == 1) {
		$data = array("isUser" => "true");   
		$data['Id'] = $users[0]['Id'];
		$data['UserLocationId'] = $users[0]['UserLocationId'];
		$data['WorkplaceId'] = $users[0]['WorkplaceId'];
		$data['EducationId'] = $users[0]['EducationId'];
		$data['isComplete'] = isset($users[0]['UserLocationId'], $users[0]['WorkplaceId'], $users[0]['EducationId']);
		echo json_encode($data);
		} else {
			$data = array("isUser" => "false");                                                                    
			echo json_encode($data);
		}
	}
?>