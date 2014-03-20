$(function() {

	var userId=sessionStorage.getItem('userId');
	console.log(userId);

	$.ajax({
		  url: 'api/friends/friend_report.php',
		  type: 'GET',
		  data: {'id': userId},
		  dataType: 'json',
			success: function(data) {
				for(var i=0; i<data.length; i++){
					$('.reports').append('<ul class="entry"><li class="text">'+data[i]['text']+'</li><li class="time">'+data[i]['time']+'</li></ul>');
					console.log(data[i]['text']);
					console.log(data[i]['time']);
				}
			},
			error: function(xhr, desc, err) {
			  console.log(xhr);
			  console.log('Details: ' + desc + '\nError:' + err);
			}
	});
});   