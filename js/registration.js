$(function() {
	$('#locationform').hide();
	$('#educationform').hide();
	$('#workform').hide();
	
	var locationls = [];
	var educationls = [];
	var workls = [];

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

	$('#register').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		// name all of it must be there
		var fname = $('#fname').val(); 
		var lname = $('#lname').val();
		// Check if already exists
		var email = $('#email').val();
		// Check with confirmation
		// Check some patterns for the password
		var password = $('#password').val();
		var spassword = $('#spassword').val();
		// make sure not empty
		var bday = $('#birthday').val();
		// make sure not empty
		var gender = $('input:radio[name=gender]').val();
		var aboutme = $('#aboutme').val();

		$.ajax({
      		url: 'helpers/echo.php',
      		type: 'post',
      		data: {'fname': fname, 'lname': lname, 'email': email,
      		 'password': password, 'bday': bday, 'gender': gender, 'aboutme': aboutme, 
      		 'locationls': locationls, 'educationls': educationls,'workls': workls},
        	success: function(data) {
          		console.log(data);
        	},
        	error: function(xhr, desc, err) {
          		console.log(xhr);
          		console.log("Details: " + desc + "\nError:" + err);
        	}
    	});
	});
});