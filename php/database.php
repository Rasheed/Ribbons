<?php
class Database
{
	private $host = "eu-cdbr-azure-north-b.cloudapp.net";
	private $user = "ba33e577d25ffb";
	private $pwd = "60f20d6c";
	private $db = "ribbonsAynsllpZX";
	
	public function init(){
	$conn = "";
    // Connect to database.
    try {
        $conn = new PDO( "mysql:host=$this->host;dbname=$this->db", $this->user, $this->pwd);
        $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    }
    catch(Exception $e){
        die(var_dump($e));
    }
	return $conn; 
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
}
?>