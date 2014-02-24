$(function() {
	$('#locationform').hide();
	$('#educationform').hide();
	$('#workform').hide();
	
	var locationls = [];
	var educationls = [];
	var workls = [];
	var fname = '';
	var lname = '';
	var email = '';
	var password = '';
	var bday = '';
	var gender = '';
	var aboutme = '';

	var emailreg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
	var passreg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 

	$('#location').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#locationform').show();
	});
	$('#locationf').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var locid = $('#locid').val();
		var loctype = $('#loctype').val();
		var loc = locid.concat(', ', loctype);
		locationls.push(loc);
		$('#locationform').hide();
		$('#locationlist').empty();
		for(var i=0; i<locationls.length; i++) {
			$('#locationlist').append('<li>'+locationls[i]+'</li>');
		}
	});
	$('#education').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#educationform').show();
	});
	$('#educationf').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var eduid = $('#eduid').val();
		var estart = $('#estart').val();
		var eend = $('#eend').val();
		var ecourse = $('#ecourse').val();
		var edu = eduid.concat(', ', estart,', ', eend, ', ', ecourse);
		educationls.push(edu);
		$('#educationform').hide();
		$('#educationlist').empty();
		for(var i=0; i<educationls.length; i++) {
			$('#educationlist').append('<li>'+educationls[i]+'</li>');
		}
	});
	$('#work').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#workform').show();
	});
	$('#workf').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var workid = $('#workid').val();
		var wstart = $('#wstart').val();
		var wend = $('#wend').val();
		var wposition = $('#wposition').val();
		var wor = workid.concat(', ', wstart,', ', wend, ', ', wposition);
		workls.push(wor);
		$('#workform').hide();
		$('#worklist').empty();
		for(var i=0; i<workls.length; i++) {
			$('#worklist').append('<li>'+workls[i]+'</li>');
		}
	});

	function checkRegisterFields() {
		fname = $('#fname').val(); 
		if(fname=='') {
			alert('You must include a first name.');
			return false;
		}
		lname = $('#lname').val();
		if(lname=='') {
			alert('You must include a last name.');
			return false;
		}
		// Check if already exists
		email = $('#email').val();
		if(email=='') {
			alert('You must include an email.');
			return false;
		}
		if(!emailreg.test(email)) {
			alert('You must include a valid email.');
			return false;
		}
		// Check some patterns for the password
		password = $('#password').val();
		spassword = $('#spassword').val();
		if(password.length < 6) {
			alert('Password must be at least 6 characters long.');
			return false;
		}
    	if (!passreg.test(password)) {
        	alert('Password must contain at least one number, one lowercase and one uppercase letter.');
        	return false;
    	}
		if(password!=spassword) {
			alert('The passwords entered do not match.');
			return false;
		}
		bday = $('#birthday').val();
		if(bday=='') {
			alert('You must include a birth date.');
			return false;
		}
		gender = $('input[name=gender]:checked').val();
		if(typeof gender === "undefined") {
			alert('You must pick a gender.');
			return false;
		}
		aboutme = $('#aboutme').val();
		return true;
	}

	$('#register').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		if(checkRegisterFields()){
			$.ajax({
      			url: 'helpers/echo.php',
      			type: 'post',
      			data: {'fname': fname, 'lname': lname, 'email': email,
      		 	'password': password, 'bday': bday, 'gender': gender, 'aboutme': aboutme, 
      		 	'locationls': locationls, 'educationls': educationls,'workls': workls},
        		success: function(data) {
          			console.log(data);
          			alert('User registered!');
        		},
        		error: function(xhr, desc, err) {
          			console.log(xhr);
          			console.log("Details: " + desc + "\nError:" + err);
        		}
    		});
    	}
	});
});