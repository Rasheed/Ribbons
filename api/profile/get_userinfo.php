<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'])) {
			$data = array();
			$id = $_GET['id'];
			$sql_select = "SELECT u.Id, u.FirstName, u.LastName, u.Birthday, u.Email, u.Gender, u.AboutMe, u.ProfilePicture, u.RibbonPicture, u.LocationId, u.EducationId, u.WorkplaceId
							FROM users u
							WHERE u.Id = ?";
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

			if(!isset($return[0]["ProfilePicture"])) {
				$data["hasProfilePic"] = false;  
			} else {
				$data["hasProfilePic"] = true;  
				$data["picturePath"] = $return[0]["ProfilePicture"];
			}
			if(!isset($return[0]["RibbonPicture"])) {
				$data["hasRibbonPic"] = false;  
			} else {
				$data["hasRibbonPic"] = true;  
				$data["rpicturePath"] = $return[0]["RibbonPicture"];
			}

			$locations = explode(",", $return[0]["LocationId"]);
			$loc_result = array();
			for($i = 0; $i < count($locations); $i++) {
				$loc_select = "SELECT Name, Status FROM location WHERE LocationId = ?";
				$loc_stmt = $conn->prepare($loc_select);
				$loc_stmt->execute(array($locations[$i]));
				$loc_return = $loc_stmt->fetchAll(PDO::FETCH_ASSOC);
				//if(count($loc_return)>0){
					$loc_result[$i] = $loc_return[0]["Name"].", ".$loc_return[0]["Status"];
				//}
			}
			$data["LocationIds"] = $loc_result;

			$educations = explode(",", $return[0]["EducationId"]);
			$edu_result = array();
			for($i = 0; $i < count($educations); $i++) {
				$edu_select = "SELECT Name, StartDate, EndDate, Course FROM education WHERE EducationId = ?";
				$edu_stmt = $conn->prepare($edu_select);
				$edu_stmt->execute(array($educations[$i]));
				$edu_return = $edu_stmt->fetchAll(PDO::FETCH_ASSOC);
				//if(count($edu_return)>0){
				$edu_result[$i] = $edu_return[0]["Name"].", ".$edu_return[0]["StartDate"].", ".$edu_return[0]["EndDate"].", ".$edu_return[0]["Course"];
				//}
			}
			$data["EducationIds"] = $edu_result;

			$works = explode(",", $return[0]["WorkplaceId"]);
			$work_result = array();
			for($i = 0; $i < count($works); $i++) {
				$work_select = "SELECT Name, Position, StartDate, EndDate FROM workplace WHERE WorkplaceId = ?";
				$work_stmt = $conn->prepare($work_select);
				$work_stmt->execute(array($works[$i]));
				$work_return = $work_stmt->fetchAll(PDO::FETCH_ASSOC);
				//if(count($edu_return)>0){
					$work_result[$i] = $work_return[0]["Name"].", ".$work_return[0]["Position"].", ".$work_return[0]["StartDate"].", ".$work_return[0]["EndDate"];
				//}
			}
			$data["WorkIds"] = $work_result;
			
			echo json_encode($data);
		} else {
			echo "no Id set";
		}
	}
?>