$(function() {
	var userId = sessionStorage.getItem('userId');
	var viewId = sessionStorage.getItem('viewId');
	
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
					$('#ribbonprofilepic').attr("style", "background-image:url('"+data.picturePath+"'); background-size: cover;");
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
							location.reload();
						}, 2000),
						error: function(xhr, desc, err) {
							console.log(xhr);
							//console.log('Details: ' + desc + '\nError:' + err);
						}
					});
            e.target.setAttribute('disabled', 'disabled');
        });
    $.ajax({
        async: false,
        url: 'api/friends/get_friends.php',
        type: 'GET',
        data: {
            'id': viewId
        },
        success: function(data) {
            console.log(data);
            var friends = JSON.parse(data);
            var friendnumber = $('<div/>', {
				html: ""
            });
            $("#main-wrapper").append(friendnumber);
            for (var i = 0; i < friends.length; i++) {
                console.log(friends[i]);
                var bodytext = $('<p>', {
                    html: 'You are friends' //friends[i].toString()
                });
                var email = $('<h4>', {
                    html: friends[i].Email
                });
                var name = $('<h3>', {
                    html: friends[i].FirstName + " " + friends[i].LastName
                });
                var ribbonhovertext = $('<div/>', {
                    class: 'ribbon-hover-text'
                });
                var ribbon = $('<div/>', {
                    id: friends[i].UserId2.toString(),
                    class: 'ribbon',
                    style: "background-image:url('"+friends[i].RibbonPicture+"'); background-size: cover;"
                });
                ribbonhovertext.append(name);
                ribbonhovertext.append(email);
                ribbonhovertext.append(bodytext);
                ribbon.append(ribbonhovertext);
                var profileimage = $('<div/>', {
                    class: 'profile-image ribbon-text',
                    style: "background-image:url('"+friends[i].ProfilePicture+"'); background-size: cover; background-repeat:no-repeat;"
                });
                ribbon.append(profileimage);
                ribbon.click(function(e) {
					sessionStorage.setItem('viewId', e.target.getAttribute('id'));
					console.log(sessionStorage.getItem('viewId'));
					window.location.href = "/viewprofile.html";	
                });
                $("#friends").append(ribbon);
            }
        },
        error: function(xhr, desc, err) {
            console.log(xhr);
            console.log('Details: ' + desc + '\nError:' + err);
        }
    });
	
});   