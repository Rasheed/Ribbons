<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	$_GET['id'] = 1;
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
			
			$xml = new DOMDocument();
			$ribbon_user = $xml->createElement("RibbonUser");
			
			
			$basic_info = $xml->createElement("BasicInfo");
			$ribbon_user->appendChild( $basic_info );
			$idx = $xml->createElement("Id", $return[0]["Id"]);
			$first_name = $xml->createElement("FirstName", $return[0]["FirstName"]);
			$last_name = $xml->createElement("LastName", $return[0]["LastName"]);
			$birthday = $xml->createElement("Birthday", $return[0]["Birthday"]);
			$email = $xml->createElement("Email", $return[0]["Email"]);
			$about_me = $xml->createElement("AboutMe", $return[0]["AboutMe"]);
			$profile_pic = $xml->createElement("ProfilePicture", $return[0]["ProfilePicture"]);
			$ribbon_pic = $xml->createElement("RibbonPicture", $return[0]["RibbonPicture"]);
			$basic_info->appendChild($idx);
			$basic_info->appendChild($first_name);
			$basic_info->appendChild($last_name);			
			$basic_info->appendChild($birthday);
			$basic_info->appendChild($email);
			$basic_info->appendChild($about_me);
			$basic_info->appendChild($profile_pic);
			$basic_info->appendChild($ribbon_pic);			
			
			$locationsxml = $xml->createElement("Locations");
			$ribbon_user->appendChild( $locationsxml );
			$locations = explode(",", $return[0]["LocationId"]);
			$loc_result = array();
			for($i = 0; $i < count($locations); $i++) {
				$loc_select = "SELECT Name, Status FROM location WHERE LocationId = ?";
				$loc_stmt = $conn->prepare($loc_select);
				$loc_stmt->execute(array($locations[$i]));
				$loc_return = $loc_stmt->fetchAll(PDO::FETCH_ASSOC);
				if(count($loc_return)>0){
					foreach ($loc_return as $location){
						$locations_elem_name = $xml->createElement("Name" , $location['Name']);
						$locations_elem_status = $xml->createElement("Status" , $location['Status']);

						$locationNode = $xml->createElement("Location");
						
						$locationNode ->  appendChild($locations_elem_name);
						$locationNode ->  appendChild($locations_elem_status);
					
						$locationsxml -> appendChild($locationNode);
					}
				}
			}
			
			$educationsxml = $xml->createElement("Educations");
			$ribbon_user->appendChild( $educationsxml );
			$educations = explode(",", $return[0]["EducationId"]);
			$edu_result = array();
			for($i = 0; $i < count($educations); $i++) {
				$edu_select = "SELECT Name, StartDate, EndDate, Course FROM education WHERE EducationId = ?";
				$edu_stmt = $conn->prepare($edu_select);
				$edu_stmt->execute(array($educations[$i]));
				$edu_return = $edu_stmt->fetchAll(PDO::FETCH_ASSOC);
				if(count($edu_return)>0){
					foreach ($edu_return as $education){
						//echo json_encode($education);
						$educations_elem_name = $xml->createElement("Name" , $education['Name']);
						$educations_elem_sd = $xml->createElement("StartDate" , $education['StartDate']);
						$educations_elem_ed = $xml->createElement("EndDate" , $education['EndDate']);
						$educations_elem_course = $xml->createElement("Course" , $education['Course']);

						$educationNode = $xml->createElement("Education");
						
						$educationNode ->  appendChild($educations_elem_name);
						$educationNode ->  appendChild($educations_elem_sd);
						$educationNode ->  appendChild($educations_elem_ed);
						$educationNode ->  appendChild($educations_elem_course);
						
						$educationsxml -> appendChild($educationNode);

					}
				}
			}
			
			$workplacesxml = $xml->createElement("Workplaces");
			$ribbon_user->appendChild( $workplacesxml );
			$works = explode(",", $return[0]["WorkplaceId"]);
			$work_result = array();
			for($i = 0; $i < count($works); $i++) {
				$work_select = "SELECT Name, Position, StartDate, EndDate FROM workplace WHERE WorkplaceId = ?";
				$work_stmt = $conn->prepare($work_select);
				$work_stmt->execute(array($works[$i]));
				$work_return = $work_stmt->fetchAll(PDO::FETCH_ASSOC);
				if(count($work_return)>0){
					foreach ($work_return as $workplace){
						$workplace_elem_name = $xml->createElement("Name" , $workplace['Name']);
						$workplace_elem_sd = $xml->createElement("StartDate" , $workplace['StartDate']);
						$workplace_elem_ed = $xml->createElement("EndDate" , $workplace['EndDate']);
						$workplace_elem_position = $xml->createElement("Position" , $workplace['Position']);

						$workplaceNode = $xml->createElement("Workplace");
						
						$workplaceNode ->  appendChild($workplace_elem_name);
						$workplaceNode ->  appendChild($workplace_elem_sd);
						$workplaceNode ->  appendChild($workplace_elem_ed);
						$workplaceNode ->  appendChild($workplace_elem_position);
						
						$workplacesxml -> appendChild($workplaceNode);
						
					}
				}
			}
			
			$mcirclesxml = $xml->createElement("MemberOfCircle");
			$ribbon_user->appendChild( $mcirclesxml );
			$circle_select = "SELECT c.CircleName FROM circlemembers cm, circles c WHERE UserId = ? AND c.CircleId = cm.CircleId;";
			$circle_stmt = $conn->prepare($circle_select);
			$circle_stmt->execute(array($id));
			$circle_return = $circle_stmt->fetchAll(PDO::FETCH_ASSOC);
			if(count($circle_return)>0){
				foreach ($circle_return as $circle){
					$circle_name = $xml->createElement("Name" , $circle['CircleName']);
					
					$circleNode = $xml->createElement("Circle");
						
					$circleNode ->  appendChild($circle_name);
						
					$mcirclesxml -> appendChild($circleNode);
				}
			}
			
			$xml->appendChild($ribbon_user );
			$xml->save("../../xml/".$id.".xml");
			$out = array("filepath" => "../../xml/".$id.".xml"); 
			$out["logpath"] = "../../logs/".$id.".log"; 
			echo json_encode($out);

		}
		/*
			$circle_owner_select = "SELECT c.CircleName FROM circlemembers cm, circles c WHERE UserId = ? AND c.CircleId = cm.CircleId;";
			$circle_owner_stmt = $conn->prepare($circle_owner_select);
			$circle_owner_stmt->execute(array($id));
			$circle_owner_return = $circle_owner_stmt->fetchAll(PDO::FETCH_ASSOC);
			if(count($circle_owner_return)>0){
				$data["OwnerCircles"] = $circle_owner_return;
			}
			echo json_encode($data);
		} else {
			echo "no Id set";
		}*/
	}
?>