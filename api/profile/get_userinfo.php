<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			$sql_select = "SELECT u.Id, u.FirstName, u.LastName, u.Gender, u.CurrentRibbonPhoto, u.CurrentProfilePhoto, w.Name, w.Position, e.Name, e.StartDate, e.EndDate, e.Course
							FROM users u, user_locations ul, workplace w, education e
							WHERE u.Id = ? AND u.UserLocationId = ul.UserLocationId AND w.WorkplaceId = u.WorkplaceId AND e.EducationId = u.EducationId;";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			echo json_encode($return[0]);
		} else {
			echo "no Id set";
		}
	}
?>