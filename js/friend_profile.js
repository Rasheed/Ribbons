$(function() {
	var userId = sessionStorage.getItem('userId');; 
	var viewId=sessionStorage.getItem('viewId');
	
	console.log(viewId);
	$.ajax({
		  async: true,  
		  url: 'api/profile/get_userinfo.php',
		  type: 'GET',
		  data: {'id': viewId},
		  dataType: 'json',
			success: function(data) {
				console.log(data);
				fname = data.FirstName;
				lname = data.LastName; 
				email = data.Email;
				bday = data.Birthday;
				gender = data.Gender;
				aboutme = data.AboutMe;
				$('#username').html(fname+' '+lname);
				$('#email').html(email);
				$('#information').html("</br>"+bday+"</br>"+gender+"</br>"+aboutme);
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
		  data: {'id': viewId},
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
	})
	
	$.ajax({
		  url: 'api/friends/isFriend.php',
		  type: 'GET',
		  data: {'id1': viewId, 'id2': userId},
		  dataType: 'json',
			success: function(data) {
			if(data.isFriend){
				$("#addfriend").hide();
			}
			},
			error: function(xhr, desc, err) {
			  console.log(xhr);
			  console.log('Details: ' + desc + '\nError:' + err);
			}
	})
		
	$("#addfriend").click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.add('loading');
            e.target.setAttribute('disabled', 'disabled');
            setTimeout(function() {
                e.target.classList.remove('loading');
                e.target.setAttribute('data-label', 'Added');
            }, 1000);
				$.ajax({
						async: true,
						url: 'api/friends/add_friends.php',
						type: 'POST',
						data: {'id1': userId, 'id2': viewId},
						success: setTimeout(function(data) {
							console.log(data);
							//location.reload();
						}, 2000),
						error: function(xhr, desc, err) {
							console.log(xhr);
							//console.log('Details: ' + desc + '\nError:' + err);
						}
					});
            e.target.setAttribute('disabled', 'disabled');
        });
});   