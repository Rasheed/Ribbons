<?php
	include("../../php/database.php");
	$DB = new Database();
	$conn = $DB->getConn();
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['id'],$_GET['user'])) {
			$id = $_GET['id'];
			$user = $_GET['user'];
			$sql_select = "SELECT toUserId, Content, CreationDate
						   FROM messages m
						   WHERE ((toUserId= ? AND fromUserId= ?) OR (fromUserId= ? AND toUserId= ?)) AND m.Type='Personal'
						   ORDER BY CreationDate DESC;";
			$stmt = $conn->prepare($sql_select);
			$stmt->execute(array($id, $user, $id, $user));
			$return = $stmt->fetchAll(PDO::FETCH_ASSOC);

			$result=array();
			for($i = 0; $i < count($return); $i++) {
				if($return[$i]['toUserId']==$id){
					$result[$i]['to']=true;
				} else{
					$result[$i]['to']=false;
				}
				$result[$i]['Content']=$return[$i]['Content'];
				$result[$i]['CreationDate']=$return[$i]['CreationDate'];
			}
			echo json_encode($result);
		} else {
			echo "no Id set";
		}
	}
?>