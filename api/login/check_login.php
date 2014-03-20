<?php
	include("../../php/database.php");
	include("../../php/log.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if(isset($_POST['username'], $_POST['password'])) {
	  $username = $_POST['username'];
	  $password = $_POST['password'];
	  $sql_select = "SELECT Id, LocationId, WorkplaceId, EducationId, ProfilePicture, RibbonPicture FROM users WHERE Email = ? AND Password = ?";
	  $stmt = $conn->prepare($sql_select);
	  $stmt->execute(array($username, $password));
	  $users = $stmt->fetchAll(PDO::FETCH_ASSOC); 
	  if(count($users) == 1) {
		$data = array("isUser" => "true");   
		$data['Id'] = $users[0]['Id'];
		$data['isComplete'] = isset($users[0]['UserLocationId'], $users[0]['WorkplaceId'], $users[0]['EducationId'], $users[0]['ProfilePicture'], $users[0]['RibbonPicture']);
		echo json_encode($data);
		$log = new log($users[0]['Id']);
		$log->a("Logged in");
		} else {
			$data = array("isUser" => "false");                                                                    
			echo json_encode($data);
		}
	}
?>