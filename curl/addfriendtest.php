<?php
	$data = array("id1"=>1, "id2"=>81);     
	$data_string = http_build_query($data);                                                                                   
	//echo $data_string;
	//echo $data_string;
	$ch = curl_init('http://localhost/api/friends/add_friends.php');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                                                                                                 
	 
	$result = curl_exec($ch);
	echo $result;
?>