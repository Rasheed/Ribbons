<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			$result=array();
			$count = 0;
			// Personal Messages
			$sql_select = "SELECT DISTINCT(u.Id), u.FirstName, u.LastName
						   FROM messages m, users u
						   WHERE m.Type='Personal' AND ((m.toUserId= ? AND m.fromUserId=u.Id) OR (m.fromUserId= ? AND m.toUserId=u.Id))";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id, $id));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC);
			for($i = 0; $i < count($return); $i++) {
				$result[$count]['Type'] = 'Personal';
				$result[$count]['Name'] = $return[$i]['FirstName'].' '.$return[$i]['LastName'];
				$result[$count]['Id'] = $return[$i]['Id'];
				$count++;
			}
			// Circle Messages
			$sql_select = "SELECT DISTINCT(c.CircleId), c.CircleName
						   FROM messages m, circles c, circlemembers cm,users u
						   WHERE m.Type='Circle' AND ((m.fromUserId= ? AND m.toUserId=c.CircleId) OR (m.toUserId=c.CircleId AND cm.CircleId=c.CircleId AND cm.UserId=?));";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id, $id));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC);
			for($i = 0; $i < count($return); $i++) {
				$result[$count]['Type'] = 'Circle';
				$result[$count]['Name'] = $return[$i]['CircleName'];
				$result[$count]['Id'] = $return[$i]['CircleId'];
				$count++;
			}
			// Group Messages
			$sql_select = "SELECT DISTINCT(g.GroupId)
						   FROM messages m, groups g, groupmembers gm,users u
						   WHERE m.Type='Group' AND ((m.fromUserId= ? AND m.toUserId=g.GroupId) OR (m.toUserId=g.GroupId AND gm.GroupId=g.GroupId AND gm.UserId=?));";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id, $id));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC);
			for($i = 0; $i < count($return); $i++) {
				$result[$count]['Type'] = 'Group';
				$result[$count]['Name'] = 'Group Message';
				$result[$count]['Id'] = $return[$i]['GroupId'];
				$count++;
			}
			echo json_encode($result);
		} else {
			echo "no Id set";
		}
	}
?>