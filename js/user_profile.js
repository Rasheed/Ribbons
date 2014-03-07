/*		$.ajax({
		  url: 'api/profile/get_userinfo.php',
		  type: 'GET',
		  data: {'id': userId},
		  dataType: 'json',
			success: function(data) {
				console.log(data);
				$('#profile_name').text(data.FirstName + " " + data.LastName);
			},
			error: function(xhr, desc, err) {
			  console.log(xhr);
			  console.log('Details: ' + desc + '\nError:' + err);
			}
		});
});*/

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

	var userId=sessionStorage.getItem('userId');
	console.log(userId);

	$('#name').html(fname+lname);
	$('#email').html(email);
	$('#bday').html(bday);
	$('#gender').html(gender);
	
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
			$('#locationlist').append('<li> <input type="checkbox" id="'+locationls[i]+'"/>'+locationls[i]+'</li>');
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
			$('#educationlist').append('<li>'+educationls[i]+'</li>');
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
			$('#worklist').append('<li>'+workls[i]+'</li>');
		}
	});

	var ribbonbar = $('#ribbonbar');
	var profilebar = $('#profilebar');
	var profilepercent = $('#profilepercent');
	var ribbonpercent = $('#ribbonpercent');
	var status1 = $('#status1');
	var status2 = $('#status2');
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
        	status1.html(xhr.responseText);
    	}
	});

 	$('#ribbonpic').ajaxForm({
    	beforeSend: function() {
        	status2.empty();
        	var percentVal = '0%';
        	ribbonbar.width(percentVal)
        	ribbonpercent.html(percentVal);
    	},
    	uploadProgress: function(event, position, total, percentComplete) {
        	var percentVal = percentComplete + '%';
        	ribbonbar.width(percentVal)
        	ribbonpercent.html(percentVal);
    	},
    	complete: function(xhr) {
     		ribbonbar.width("100%");
    		ribbonpercent.html("100%");
        	status2.html(xhr.responseText);
    	}
	});
});   

