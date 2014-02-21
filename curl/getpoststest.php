<?php
	$data = array("id" => 1);                                                                    
	$data_string = http_build_query($data);                                                                                   
 
	$ch = curl_init('http://localhost/api/posts/get_posts.php?id=1');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                                     
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                                                                                                 
	 
	$result = curl_exec($ch);
	echo $result;
?>