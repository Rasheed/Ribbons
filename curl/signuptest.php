<?php
	$data = array("first_name"=>"new", "last_name"=>"user","email" => "newr@user.com", "password" => "pass", "gender" => "Male", "birthday"=>"1992-12-16");     
	$data_string = http_build_query($data);                                                                                   
	//echo $data_string;
	//echo $data_string;
	$ch = curl_init('http://localhost/api/registration/signup.php');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                                                                                                 
	 
	$result = curl_exec($ch);
	echo $result;
?>