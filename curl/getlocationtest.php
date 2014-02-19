<?php                                                                              
	$ch = curl_init('http://localhost/api/location/get_locations.php');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                                     
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                                                                                                 
	 
	$result = curl_exec($ch);
	echo $result;
?>