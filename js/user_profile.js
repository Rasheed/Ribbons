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
	$('#ruserid').attr('value', userId);
	console.log(userId);

	$.ajax({
		  async: true,  
		  url: 'api/profile/get_userinfo.php',
		  type: 'GET',
		  data: {'id': userId},
		  dataType: 'json',
			success: function(d) {
				var data = JSON.parse(d);
				console.log(data);
				fname = data.FirstName;
				lname = data.LastName; 
				email = data.Email;
				bday = data.Birthday;
				gender = data.Gender;
				aboutme = data.AboutMe;
				$('#username').html(fname+' '+lname);
				$('#email').html(email);
				$('#bday').html(bday);
				$('#gender').html(gender);
				$('#aboutme').html(aboutme);
				if(data.hasProfilePic) {
					$('#ribbon').attr("style", "background-image:url('"+data.picturePath+"'); background-size: cover;");

				} else {
					$('#profileimage').text('No Profile Picture Available.');
				}
				if(data.hasRibbonPic) {
					//$('#rimage').attr("src",data.rpicturePath);
					$('#ribbon').attr("style", "background-image:url('"+data.rpicturePath+"'); background-size: cover;");
				} else {
					$('#ribbonimage').text('No Ribbon Picture Available.');
				}
				for (var i = 0; i < data.LocationIds.length-1; ++i) {
					locationls.push(data.LocationIds[i]);
    				$('#locationlist').append('<li id="locationItem"><img src="js/delete.png">'+'   '+data.LocationIds[i]+'</li>');
				}
				for (var i = 0; i < data.EducationIds.length-1; ++i) {
					educationls.push(data.EducationIds[i]);
    				$('#educationlist').append('<li id="educationItem"><img src="js/delete.png">'+'   '+data.EducationIds[i]+'</li>');
				}
				for (var i = 0; i < data.WorkIds.length-1; ++i) {
					workls.push(data.WorkIds[i]);
    				$('#worklist').append('<li id="workItem"><img src="js/delete.png">'+'   '+data.WorkIds[i]+'</li>');
				}
			},
			error: function(xhr, desc, err) {
			  console.log(xhr);
			  			  console.log(desc);
			  console.log(xhr);
			  //console.log('Details: ' + desc + '\nError:' + err);
			}
	});

	$.ajax({
		  url: 'api/blog/get_blog.php',
		  type: 'GET',
		  data: {'id': userId},
		  dataType: 'json',
			success: function(data) {
				for(var i=0; i<data.length; i++){
					$('.reports').append('<ul class="entry"><li class="text">'+data[i]['Body']+'</li><li class="time">'+data[i]['CreationDate']+'</li></ul>');
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
	var ribbonbar = $('#ribbonbar');
	var ribbonpercent = $('#ribbonpercent');
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
    		if(xhr.responseText[0]=='.') {
        		status1.html("The file has been uploaded successfully.");
        		$('#pimage').attr("src",xhr.responseText);
				$('#ribbonprofilepic').attr("style", "background-image:url('"+xhr.responseText+"'); background-size: cover;");;

        	} else {
        		status1.html(xhr.responseText);
        	}
    	}
	});

	$('#ribbonpic').ajaxForm({
    	beforeSend: function() {
        	status2.empty();
        	var percentVal = '0%';
        	ribbonbar.width(percentVal);
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
    		if(xhr.responseText[0]=='.') {
        		status2.html("The file has been uploaded successfully.");
        		$('#rimage').attr("src",xhr.responseText);
				$('#ribbon').attr("style", "background-image:url('"+xhr.responseText+"'); background-size: cover;");
        	} else {
        		status2.html(xhr.responseText);
        	}
    	}
	});

	$('#add_post').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var body = $('#post').val();
		$.ajax({
		  url: 'api/blog/add_post.php',
		  type: 'GET',
		  data: {'id': userId, 'body':body},
		  dataType: 'json',
			success: function(data) {
				if(data['postAdded']) {
					$('.reports').prepend('<ul class="entry"><li class="text">'+body+'</li><li class="time">Just now</li></ul>');
				}
			},
			error: function(xhr, desc, err) {
			  console.log(xhr);
			  console.log('Details: ' + desc + '\nError:' + err);
			}
	});
	});
});   