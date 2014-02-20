<?php
	$data = array("username" => "test@user.com", "password" => "pass");                                                                    
	$data_string = http_build_query($data);                                                                                   
 
	$ch = curl_init('http://localhost/api/login/check_login.php');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                                                                                                 
	 
	$result = curl_exec($ch);
	echo $result;
?>