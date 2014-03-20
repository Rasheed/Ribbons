$(function() {
	var fname = '';
	var lname = '';
	var email = '';
	var password = '';
	var bday = '';
	var gender = '';

	var emailreg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
	var passreg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 

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
		gender = $('#gender').val();
		if(!((gender == "Male") || (gender == "FEMALE"))) {
			alert('You must pick a gender.');
			return false;
		}
		return true;
	}

	$('#register').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		if(checkRegisterFields()){
			$.ajax({
      			url: 'api/registration/signup.php',
      			type: 'post',
      			data: {'first_name': fname, 'last_name': lname, 'email': email,
      		 		'password': password, 'birthday': bday, 'gender': gender},
        		success: function(data) {
          			if(eval(data.userGenerated)) {
            			console.log('Moving to homepage');
			      		console.log(data.userId);
            			sessionStorage.setItem('userId',data.userId);
            			window.location.href='user_profile.html';
          			}
          			if(!eval(data.userGenerated)) {
            			alert('The entered email is already registered.');
          			}
        		},
        		error: function(xhr, desc, err) {
          			console.log(xhr);
          			console.log('Details: ' + desc + '\nError:' + err);
        		}
    		});
    	}
	});
});