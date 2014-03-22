<?php
	include("../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	$id = $_POST['Id'];
	$target_path = "../uploads/".$id."/profile/";
	$date = date('Y-m-d-H-i-s');
	$dates = date('Y-m-d H:i:s');
	$target_path = $target_path . basename($date);
	$albumId;

	$find_album = "SELECT Id FROM albums WHERE UserId = ? AND Name = 'Profile'";
	$album_stmt = $conn->prepare($find_album);
	$album_stmt->execute(array($id));
	$result = $album_stmt->fetchAll(PDO::FETCH_ASSOC); 
	if(count($result)==0){ 
		mkdir("../uploads/".$id."/profile", 0777, true);
		$sql_insert = "INSERT INTO albums (UserId,Name,LocationId,CreationDate,AccessRights) VALUES (?,'Profile',NULL,?,'Public');";
		$stmt = $conn->prepare($sql_insert);
		$stmt->execute(array($id, $dates));			 
		$albumId = $conn->lastInsertId();
	} else {
		$albumId = $result[0]['Id'];
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
			$photo_insert = "INSERT INTO photos (AlbumId,Path,Name,CreationDate) VALUES (?,?,'Profile',?);";
			$photo_stmt = $conn->prepare($photo_insert);
			$photo_stmt->execute(array($albumId, $target_path, $dates));	

			$user_update = "UPDATE users SET ProfilePicture = ? WHERE Id = ?";
			$user_stmt = $conn->prepare($user_update);
			$user_stmt->execute(array($target_path, $id));
	    	echo $target_path;

		} else{
	    	echo "There was an error uploading the file, please try again!";
		}
	} else {
	  echo "Invalid file";
	}
	
	
?>