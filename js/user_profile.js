$(function() {
	$('#locationform').hide();
	$('#educationform').hide();
	$('#workform').hide();
	
	var fname = '';
	var lname = '';
	var email = '';
	var bday = '';
	var gender = '';
	var locationls = [];
	var educationls = [];
	var workls = [];
	var aboutme = '';

	var userId=sessionStorage.getItem('userId');
	$('#userId').attr('value', userId);
	console.log(userId);

	$.ajax({
		  url: 'api/profile/get_userinfo.php',
		  type: 'GET',
		  data: {'id': userId},
		  dataType: 'json',
			success: function(data) {
				console.log(data);
				fname = data.FirstName;
				lname = data.LastName; 
				email = data.Email;
				bday = data.Birthday;
				gender = data.Gender;
				aboutme = data.AboutMe;
				$('#name').html(fname+' '+lname);
				$('#email').html(email);
				$('#bday').html(bday);
				$('#gender').html(gender);
				$('#aboutme').html(aboutme);
				if(data.hasProfilePic) {
					//alert("<img src='"+data.picturePath+"'/>");
					$('#pimage').attr("src",data.picturePath);
				} else {
					//alert("No pictures!!");
					$('#profileimage').text('No Profile Picture Available.');
				}
			},
			error: function(xhr, desc, err) {
			  console.log(xhr);
			  console.log('Details: ' + desc + '\nError:' + err);
			}
	});
	
	$('#location').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#locationform').show();
	});
	$('#cancelloc').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#locationform').hide();
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
			$('#locationlist').append('<li id="locationItem"><img src="js/delete.png">'+'   '+locationls[i]+'</li>');
		}
	});

	$('#education').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#educationform').show();
	});
	$('#canceledu').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#educationform').hide();
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
			$('#educationlist').append('<li id="educationItem"><img src="js/delete.png">'+'   '+educationls[i]+'</li>');
		}
	});
	$('#work').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#workform').show();
	});
	$('#cancelwork').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#workform').hide();
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
			$('#worklist').append('<li id="workItem"><img src="js/delete.png">'+'   '+workls[i]+'</li>');
		}
	});
	$(document).on('click', '#locationItem', function(e) {
        e.preventDefault();
		e.stopPropagation();
		var li = $('#locationItem');
		console.log(li.text());
		var index = $.inArray(li.text(), locationls);
        locationls.splice(index, 1);
        $('#locationlist').empty();
        for(var i=0; i<locationls.length; i++) {
			$('#locationlist').append('<li id="locationItem"><img src="js/delete.png">'+'   '+locationls[i]+'</li>');
		}
	});
	$(document).on('click', '#educationItem', function(e) {
        e.preventDefault();
		e.stopPropagation();
		var li = $('#educationItem');
		console.log(li.text());
		var index = $.inArray(li.text(), educationls);
        educationls.splice(index, 1);
        $('#educationlist').empty();
		for(var i=0; i<educationls.length; i++) {
			$('#educationlist').append('<li id="educationItem"><img src="js/delete.png">'+'   '+educationls[i]+'</li>');
		}
	});
	$(document).on('click', '#workItem', function(e) {
        e.preventDefault();
		e.stopPropagation();
		var li = $('#workItem');
		console.log(li.text());
		var index = $.inArray(li.text(), workls);
        workls.splice(index, 1);
        $('#worklist').empty();
		for(var i=0; i<workls.length; i++) {
			$('#worklist').append('<li id="workItem"><img src="js/delete.png">'+'   '+workls[i]+'</li>');
		}
	});

	var profilebar = $('#profilebar');
	var profilepercent = $('#profilepercent');
	var status1 = $('#status1');

	$('#profilepic').ajaxForm({
    	beforeSend: function() {
        	status1.empty();
        	var percentVal = '0%';
        	profilebar.width(percentVal);
        	profilepercent.html(percentVal);
    	},
    	uploadProgress: function(event, position, total, percentComplete) {
        	var percentVal = percentComplete + '%';
        	profilebar.width(percentVal)
        	profilepercent.html(percentVal);
    	},
    	complete: function(xhr) {
     		profilebar.width("100%");
    		profilepercent.html("100%");
<<<<<<< HEAD
<<<<<<< HEAD
    		if(xhr.responseText[0]=='.') {
        		status1.html("The file has been uploaded successfully.");
        		$('#pimage').attr("src",xhr.responseText);
        	} else {
        		status1.html(xhr.responseText);
        	}
=======
        	status1.html(xhr.responseText);
>>>>>>> FETCH_HEAD
=======
        	status1.html(xhr.responseText);
>>>>>>> FETCH_HEAD
    	}
	});
});   