<?php
class Database extends PDO
{
	private $host = "eu-cdbr-azure-north-b.cloudapp.net";
	private $user = "ba33e577d25ffb";
	private $pwd = "60f20d6c";
	private $db = "ribbonsAynsllpZX";
	private $conn;
	
	public function __construct(){
		// Connect to database.
		try {
			$conn = new PDO( "mysql:host=$this->host;dbname=$this->db", $this->user, $this->pwd);
			$conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			$this->conn = $conn;
		}
		catch(Exception $e){
			die(var_dump($e));
		}
	}
	
	public function getHost(){
		return $this->host;
	}
	
	public function getUser(){
		return $this->user;
	}
	
	public function getPassword(){
		return $this->pwd;
	}
	
	public function getDb(){
		return $this->db;
	}
	
	public function getConn(){
		return $this->conn;
	}
}
?>