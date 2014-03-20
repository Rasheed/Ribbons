<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	$date = date('Y-m-d H:i:s');

	if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
		$sql_insert = "INSERT INTO posts (OwnerUserId,Body,CreationDate) VALUES (?,?,?);";
 		$stmt = $conn->prepare($sql_insert);
 		$stmt->execute(array($_GET['id'], $_GET['body'], $date));
 		$data = array("postAdded" => "true"); 
		echo json_encode($data);
	}
	function humanTiming ($time) {
	    $time = time() - $time;
	    $tokens = array (
	        31536000 => 'year',
	        2592000 => 'month',
	        604800 => 'week',
	        86400 => 'day',
	        3600 => 'hour',
	        60 => 'minute',
	        1 => 'second'
	    );
	    foreach ($tokens as $unit => $text) {
	        if ($time < $unit) continue;
	        $numberOfUnits = floor($time / $unit);
	        return $numberOfUnits.' '.$text.(($numberOfUnits>1)?'s':'');
	    }
	}
?>