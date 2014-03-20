$(document).ready(function(){				

		var userId=11;//sessionStorage.getItem('userId');
		//console.log(userId);
		$.ajax({
				async: false,
      			url: 'api/friends/get_friends.php',
      			type: 'GET',
      			data: {'id': userId},
        		success: function(data) {
					//console.log(data);
					var friends = JSON.parse(data);
					var friendnumber = $('<div/>', {
							html: "You have " + friends.length + " friends"
							});
					$("#main-wrapper").append(friendnumber);
          			for(var i = 0; i < friends.length; i++){
						//console.log(friends[i]);
						var bodytext = $('<p>', {
							html: 'You are friends'//friends[i].toString()
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
							style: "background-image:url('http://backgrounddesignz.com/wp-content/uploads/2013/12/ws_Minimal_Gray_to_White_Gradient_1920x1200.jpg'); background-size: cover;"
							});
						ribbonhovertext.append(name);
						ribbonhovertext.append(email);
						ribbonhovertext.append(bodytext);
						ribbon.append(ribbonhovertext);
						var profileimage = $('<div/>', {
							class: 'profile-image ribbon-text',
							style: "background-image:url('http://blog.zap2it.com/pop2it/jennifer-lawrence-miss-dior-thumbnail.jpg'); background-size: cover; background-repeat:no-repeat;"
							});
						ribbon.append(profileimage); 
						ribbon.click(function(e) {
							alert(e.target.getAttribute('id'));
						});
						$("#main-wrapper").append(ribbon); 
					}
        		},
        		error: function(xhr, desc, err) {
          			console.log(xhr);
          			console.log('Details: ' + desc + '\nError:' + err);
        		}
    		});
						
		/*$.ajax({
				async: false,
      			url: 'api/friends/get_friends_of_friends.php',
      			type: 'GET',
      			data: {'id': userId},
        		success: function(data) {
					//console.log(data);
					var friends = JSON.parse(data);
					if(friends.length == 0) { 
						return;
					}
					var friendnumber = $('<p/>', {
							html: "You have " + friends.length + " friends of friends"
							});
					$("#main-wrapper").append(friendnumber);
          			for(var i = 0; i < friends.length; i++){
						//console.log(friends[i]);
						var bodytext = $('<p>', {
							html: ''//friends[i].toString()
							});
						var email = $('<h4>', {
							html: friends[i].Email 
							});
						var name = $('<h3>', {
							html: friends[i].FirstName + " " + friends[i].LastName 
							});
						var addButton = $('<div>', {
							id : friends[i].Id,
							class : "button",
							'data-label' : "Add Friend"
						});
						var ribbonhovertext = $('<div/>', {
							class: 'ribbon-hover-text',
							style: "background:rgba(217,255,0,0.60)",
							id: friends[i].Id.toString()
							});
						var ribbon = $('<div/>', {
							id: friends[i].Id.toString(),
							class: 'ribbon'//,
							//style: "background-image:url('http://backgrounddesignz.com/wp-content/uploads/2013/12/ws_Minimal_Gray_to_White_Gradient_1920x1200.jpg'); background-size: cover;"
							});
						ribbonhovertext.append(name);
						ribbonhovertext.append(email);
						ribbonhovertext.append(addButton);
						ribbonhovertext.append(bodytext);
						ribbon.append(ribbonhovertext);
						var profileimage = $('<div/>', {
							class: 'profile-image ribbon-text',
							style: "background-image:url('http://blog.zap2it.com/pop2it/jennifer-lawrence-miss-dior-thumbnail.jpg'); background-size: auto;"
							});
						ribbon.append(profileimage); 
						ribbon.click(function(e) {
							alert(e.target.getAttribute('id'));
						});
						ribbonhovertext.click(function(e) {
							alert(e.target.getAttribute('id'));
						});
						$("#main-wrapper").append(ribbon); 
					}
        		},
        		error: function(xhr, desc, err) {
          			console.log(xhr);
          			console.log('Details: ' + desc + '\nError:' + err);
        		}
    		});*/
		
		$.ajax({
				async: false,
      			url: 'api/friends/circles/get_my_circles.php',
      			type: 'GET',
      			data: {'id': userId},
        		success: function(data) {
					console.log(data);
					var circles = JSON.parse(data);
					for(var i = 0; i<circles.length; i++) {
						var circle = $('<div>', {
							id : circles[i].CircleId,
							class : "circle",
						});
						var circleName1 = $('<h1>', {
							id : circles[i].CircleId,
							html: circles[i].CircleName
						});
						var circleName2 = $('<h2>', {
							id : circles[i].CircleId,
							html: circles[i].CircleName
						});
						circle.append(circleName1);
						circle.append(circleName2);
						$('#mycircles').append(circle);
						
						circle.click(function(e) {
							console.log(e);
							 e.preventDefault();
							  e.stopPropagation();
							  var circleid = e.target.getAttribute('id');
								$.ajax({
									async: true,
									url: 'api/friends/circles/get_circle_members.php',
									type: 'GET',
									data: {'circleid': circleid},
									success:function(data) {
										var friends = JSON.parse(data);
										for(var i = 0; i < friends.length; i++){
											console.log(friends[i]);
											var bodytext = $('<p>', {
												html: 'You are friends'//friends[i].toString()
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
												id: friends[i].Id,
												class: 'ribbon',
												style: "background-image:url('http://backgrounddesignz.com/wp-content/uploads/2013/12/ws_Minimal_Gray_to_White_Gradient_1920x1200.jpg'); background-size: cover;"
												});
											ribbonhovertext.append(name);
											ribbonhovertext.append(email);
											ribbonhovertext.append(bodytext);
											ribbon.append(ribbonhovertext);
											var profileimage = $('<div/>', {
												class: 'profile-image ribbon-text',
												style: "background-image:url('http://blog.zap2it.com/pop2it/jennifer-lawrence-miss-dior-thumbnail.jpg'); background-size: cover; background-repeat:no-repeat;"
												});
											ribbon.append(profileimage); 
											ribbon.click(function(e) {
												alert(e.target.getAttribute('id'));
											});
											$("#circlemembers").append(ribbon); 
										}
									},
									error: function(xhr, desc, err) {
										//console.log(xhr);
										//console.log('Details: ' + desc + '\nError:' + err);
									}
								});
							  e.target.removeEventListener('click', loading);
						});
					} 
        		},
        		error: function(xhr, desc, err) {
          			console.log(xhr);
          			console.log('Details: ' + desc + '\nError:' + err);
        		}
    		});						
			
			var loading = function(e) {
				  e.preventDefault();
				  e.stopPropagation();
				  e.target.classList.add('loading');
				  e.target.setAttribute('disabled','disabled');
				  var newfriendid = e.target.getAttribute('id');
				   setTimeout(function(){
					e.target.classList.remove('loading');
					e.target.setAttribute('data-label','Added');
				  },1000);
					  $.ajax({
						async: true,
						url: 'api/friends/add_friends.php',
						type: 'POST',
						data: {'id1': userId, 'id2': newfriendid},
						success: setTimeout(function(data) {
							//console.log(data);
							location.reload();
						}, 2000),
						error: function(xhr, desc, err) {
							//console.log(xhr);
							//console.log('Details: ' + desc + '\nError:' + err);
						}
					});
				  e.target.removeEventListener('click', loading);
			};

			var btns = document.querySelectorAll('.button');
				for (var i=btns.length-1;i>=0;i--) {
				 btns[i].addEventListener('click',loading);
			}
});