<?php 
Class log { 
	
	private $userId;
	private $filename;
	public function __construct($userId) 
    { 
        $this->userId = $userId;
		$this->filename = getenv("DOCUMENT_ROOT")."/logs/".$this->userId.".log";
		$this->checkiffileexists($this->filename);
    } 
	
	
	public function checkiffileexists($filename){	
		if (file_exists($filename)) {
			//echo "The file $filename exists";
		} else {
			$file = fopen($filename,"w");
			fwrite($file,"");
			fclose($file);
		}
	}

    public function a($msg) 
    { 
    $date = date('d.m.Y h:i:s'); 
    $log = "|  Date:  ".$date."  |  UserId: ".$this->userId."  |  Activity:  ".$msg."  \n"; 
    error_log($log, 3, $this->filename); 
    } 
    /* 
   General Errors... 
  */ 
    public function general($msg) 
    { 
    $date = date('d.m.Y h:i:s'); 
    $log = $msg."   |  Date:  ".$date."\n"; 
    } 

} 
//$log->general($msg); //use for general errors 
?>