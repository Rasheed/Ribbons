<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			$sql_select = "SELECT Body, CreationDate
						   FROM posts
						   WHERE OwnerUserId = ?
						   ORDER BY CreationDate DESC";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC);

			for($i = 0; $i < count($return); $i++) {
				$time = strtotime($return[$i]['CreationDate']);
				$return[$i]['CreationDate'] = humanTiming($time).' ago';
			}
			echo json_encode($return);
		} else {
			echo "no Id set";
		}
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