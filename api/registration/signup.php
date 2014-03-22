 <?php
 	include("../../php/database.php");
  	$DB = new Database();
 	$conn = $DB->getConn();
 	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 		if(isset($_POST['email'], $_POST['password'], $_POST['first_name'], $_POST['last_name'], $_POST['gender'], $_POST['birthday'])) {
 		  $email = $_POST['email'];
		  $password = $_POST['password'];
 		  $first_name = $_POST['first_name'];
 		  $last_name = $_POST['last_name'];
 		  $gender = $_POST['gender'];		  
 		  $birthday = $_POST['birthday'];
 		  $sql_select = "SELECT Id FROM users WHERE Email = ?";
 		  $stmt = $conn->prepare($sql_select);
 		  $stmt->execute(array($email));
 		  $users = $stmt->fetchAll(PDO::FETCH_ASSOC); 
 		  if(count($users)>0){
 			$data = array("userGenerated" => "false");   
			echo json_encode($data);
 			return;
 		  } else { 
 			$sql_insert = "INSERT INTO users (Email,Password,FirstName,LastName,Gender,Birthday,Admin) VALUES (?,?,?,?,?,?,0);";
 			$stmt = $conn->prepare($sql_insert);
 			$stmt->execute(array($email, $password, $first_name, $last_name, $gender, $birthday));			
 			$data = array("userGenerated" => "true");  
			$data['Id'] = $conn->lastInsertId();
			echo json_encode($data);
 			return;
 		  }
 		  echo json_encode($users);
 		}
		else{
 		  echo "error";
 		}
  	}
?>