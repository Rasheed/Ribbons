<?php
	$data = json_decode("{type: 'Female',label: '',latitude: 51,longitude: 0,buildingName: 'Office toilet',floor: 'G', descriptionOfLocation: 'past the reception', ammenities: 'Condoms',hygiene: 4,comfort: 4,accessibility: 4, rating: 4,comment: 'Clean'}");  
	echo $data;
	$data_string = http_build_query($data);                                                                                   
	//echo $data_string;
	//echo $data_string;
	$ch = curl_init("http://localhost:3000/toilets");                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                                                                                                 
	 
	$result = curl_exec($ch);
	echo $result;
?>