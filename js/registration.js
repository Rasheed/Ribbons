$(function() {
	var locationls = [];
	var educationls = [];
	var workls = [];

	$('#locationform').hide();
	$('#educationform').hide();
	$('#workform').hide();

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
		alert(locationls);
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
		$("#worklist").empty();
		for(var i=0; i<workls.length; i++) {
			$("#worklist").append("<li>"+workls[i]+"</li>");
		}
	});
});