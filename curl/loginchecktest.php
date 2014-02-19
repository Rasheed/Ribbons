<?php
	$data = array("username" => "test@user.com", "password" => "pass");                                                                    
	$data_string = http_build_query($data);                                                                                   
 
	$ch = curl_init('http://localhost/api/locations/get_locations.php');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                                                                                                 
	 
	$result = curl_exec($ch);
	echo $result;
?>