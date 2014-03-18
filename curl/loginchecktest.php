<?php
	$data = array("username" => "newr@user.com", "password" => "pass");                                                                    
	$data_string = http_build_query($data);                                                                                   
 
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'localhost/api/login/check_login.php');
	curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/32.0.1700.107 Chrome/32.0.1700.107 Safari/537.36');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_COOKIESESSION, true);
	curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
	curl_setopt($ch, CURLOPT_COOKIEFILE, 'tmp');  //could be empty, but cause problems on some hosts
	$answer = curl_exec($ch);
	if (curl_error($ch)) {
		echo curl_error($ch);
	}
	echo $answer;
?>