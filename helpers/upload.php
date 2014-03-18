<?php
	include("../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	$id = $_POST['Id'];
	$target_path = "../uploads/".$id."/profile/";
	$date = date('Y-m-d-H-i-s');
	$target_path = $target_path . basename($date);
	
	if (!file_exists("../uploads/".$id."/profile")) {
		mkdir("../uploads/".$id."/profile", 0777, true);
		$sql_insert = "INSERT INTO albums (UserId,Name,LocationId,CreationDate) VALUES (?,'Profile',NULL,?);";
 		$stmt = $conn->prepare($sql_insert);
 		$stmt->execute(array($id, $date));			 
		$photoId = $conn->lastInsertId();
	}

	$allowedExts = array("gif", "jpeg", "jpg", "png");
	$temp = explode(".", $_FILES["uploadedfile"]["name"]);
	$extension = end($temp);
	if ((($_FILES["uploadedfile"]["type"] == "image/gif")
	|| ($_FILES["uploadedfile"]["type"] == "image/jpeg")
	|| ($_FILES["uploadedfile"]["type"] == "image/jpg")
	|| ($_FILES["uploadedfile"]["type"] == "image/pjpeg")
	|| ($_FILES["uploadedfile"]["type"] == "image/x-png")
	|| ($_FILES["uploadedfile"]["type"] == "image/png")) 
	&& ($_FILES["uploadedfile"]["size"] < 5000000)
	&& in_array($extension, $allowedExts)) {
		if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
	    	echo "The file ". basename($_FILES['uploadedfile']['name'])." has been uploaded";

		} else{
	    	echo "There was an error uploading the file, please try again!";
		}
	} else {
	  echo "Invalid file";
	}
	
	$photo_insert = "INSERT INTO photos (AlbumId,Path,Name,CreationDate) VALUES (?,?,'Profile',?);";
	$photo_stmt = $conn->prepare($photo_insert);
	$photo_stmt->execute(array($photoId, $target_path, $date));	
?>