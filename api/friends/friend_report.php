<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			$sql_select = "SELECT DISTINCT(u.Id), u.FirstName, u.LastName
						   FROM friendship f, users u 
						   WHERE f.UserId1 = ? AND f.UserId2 = u.Id";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC); 

			$final = array();
			$count = 0;

			for($i = 0; $i < count($return); $i++) {

				$sql_select = "SELECT u.Id, u.FirstName, u.LastName, f.CreationDate
							   FROM friendship f, users u 
							   WHERE f.UserId1 = ? AND f.UserId2 = u.Id";
				$stmt = $conn->prepare($sql_select);
				$stmt->execute(array($return[$i]["Id"]));
				$result1 = $stmt->fetchAll(PDO::FETCH_ASSOC); 

				for($j = 0; $j < count($result1); $j++) {
					$final[$count]['text'] = $return[$i]["FirstName"]." ".$return[$i]["LastName"]." became friends with ".$result1[$j]["FirstName"]." ".$result1[$j]["LastName"];
					$final[$count]['time'] = $result1[$j]["CreationDate"];
					$count++;
				}

				$sql_select = "SELECT c.CircleName, c.CreationDate
							   FROM circles c
							   WHERE c.OwnerId = ?";
				$stmt = $conn->prepare($sql_select);
				$stmt->execute(array($return[$i]["Id"]));
				$result2 = $stmt->fetchAll(PDO::FETCH_ASSOC); 
				for($k = 0; $k < count($result2); $k++) {
					$final[$count]['text'] = $return[$i]["FirstName"]." ".$return[$i]["LastName"]." created a circle ".$result2[$k]["CircleName"];
					$final[$count]['time'] = $result2[$k]["CreationDate"];
					$count++;
				}

				$sql_select = "SELECT m.CreationDate ,c.CircleName
							   FROM circlemembers m, circles c
							   WHERE m.UserId = ? AND m.CircleId=c.CircleId";
				$stmt = $conn->prepare($sql_select);
				$stmt->execute(array($return[$i]["Id"]));
				$result3 = $stmt->fetchAll(PDO::FETCH_ASSOC); 
				for($l = 0; $l < count($result3); $l++) {
					$final[$count]['text'] = $return[$i]["FirstName"]." ".$return[$i]["LastName"]." joined the circle ".$result3[$l]["CircleName"];
					$final[$count]['time'] = $result3[$l]["CreationDate"];
					$count++;
				}
			}
			$times = array(); 
			foreach ($final as $t) {    
				$times[] = $t['time'];
			}
			array_multisort($times, SORT_DESC, $final);

			for($t = 0; $t < count($final); $t++) {
				$time = strtotime($final[$t]['time']);
				$final[$t]['time'] = humanTiming($time).' ago';
			}
			echo json_encode($final);
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