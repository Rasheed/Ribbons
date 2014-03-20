<?php
	$data = array("id"=>21, "circleid"=>11);     
	$data_string = http_build_query($data);                                                                                   
	//echo $data_string;
	//echo $data_string;
	$ch = curl_init('http://localhost/api/friends/circles/delete_from_circle.php');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                                                                                                 
	 
	$result = curl_exec($ch);
	echo $result;
?>