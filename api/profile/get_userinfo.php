<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'])) {
			$data = array();
			$id = $_GET['id'];
			$sql_select = "SELECT u.Id, u.FirstName, u.LastName, u.Birthday, u.Email, u.Gender, u.AboutMe, u.ProfilePicture, u.RibbonPicture, w.Name , w.Position, e.Name AS EduName, e.StartDate, e.EndDate, e.Course
							FROM users u, user_locations ul, workplace w, education e
							WHERE u.Id = ? AND u.UserLocationId = ul.UserLocationId AND w.WorkplaceId = u.WorkplaceId AND e.EducationId = u.EducationId;";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			$data["Id"] = $return[0]["Id"];
			$data["FirstName"] = $return[0]["FirstName"];
			$data["LastName"] = $return[0]["LastName"];
			$data["Birthday"] = $return[0]["Birthday"];
			$data["Email"] = $return[0]["Email"];
			$data["Gender"] = $return[0]["Gender"];
			$data["AboutMe"] = $return[0]["AboutMe"];
			$data["Name"] = $return[0]["Name"];
			$data["Position"] = $return[0]["Position"];
			$data["EduName"] = $return[0]["EduName"];
			$data["StartDate"] = $return[0]["StartDate"];
			$data["EndDate"] = $return[0]["EndDate"];
			$data["Course"] = $return[0]["Course"];

			if(!isset($return[0]["ProfilePicture"])) {
				$data["hasProfilePic"] = false;  
			} else {
				$data["hasProfilePic"] = true;  
				$data["picturePath"] = $return[0]["ProfilePicture"];
			}
			echo json_encode($data);
		} else {
			echo "no Id set";
		}
	}
?>