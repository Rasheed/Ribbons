$(document).ready(function() {
		var userId = sessionStorage.getItem('userId');
	
	    $.ajax({
        async: false,
        url: 'api/friends/circles/get_my_circles.php',
        type: 'GET',
        data: {
            'id': userId
        },
        success: function(data) {
            console.log(data);
            var circles = JSON.parse(data);
            for (var i = 0; i < circles.length; i++) {
                var circle = $('<div>', {
                    id: circles[i].CircleId,
                    class: "circle",
                });
                var circleName1 = $('<h1>', {
                    id: circles[i].CircleId,
                    html: circles[i].CircleName
                });
                var circleName2 = $('<h2>', {
                    id: circles[i].CircleId,
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
                        data: {
                            'circleid': circleid
                        },
                        success: function(data) {
                            console.log(data);
                            var friends = JSON.parse(data);
                            $("#circlemembers").html(friends[0].CircleName);
                            for (var i = 0; i < friends.length; i++) {
                                console.log(friends[i]);
                                var bodytext = $('<p>', {
                                    html: '' //friends[i].toString()
                                });
                                var email = $('<h4>', {
                                    html: friends[i].Email
                                });
                                var name = $('<h3>', {
                                    html: friends[i].FirstName + " " + friends[i].LastName
                                });
                                var addButton = $('<div>', {
                                    id: friends[i].Id+','+circleid,
                                    class: "button",
                                    'data-label': "Delete"
                                });
                                addButton.click(loading);
                                var ribbonhovertext = $('<div/>', {
                                    class: 'ribbon-hover-text',
                                    style: "background-color:rgba(217,255,0,0.60)",
                                    id: friends[i].Id.toString()
                                });
                                var ribbon = $('<div/>', {
                                    id: friends[i].Id.toString(),
                                    class: 'ribbon',
                                    style: "background-image:url('"+friends[i].RibbonPicture+"'); background-size: cover;"
                                });
                                ribbonhovertext.append(name);
                                ribbonhovertext.append(email);
                                ribbonhovertext.append(addButton);
                                ribbonhovertext.append(bodytext);
                                ribbon.append(ribbonhovertext);
                                var profileimage = $('<div/>', {
                                    class: 'profile-image ribbon-text',
                                    style: "background-image:url('"+friends[i].ProfilePicture+"'); background-size: auto;"
                                });
                                ribbon.append(profileimage);
                                $("#circlemembers").append(ribbon);
                            }
                        },
                        error: function(xhr, desc, err) {
                            //console.log(xhr);
                            //console.log('Details: ' + desc + '\nError:' + err);
                        }
                    });
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
            e.target.setAttribute('disabled', 'disabled');
			var res = e.target.getAttribute('id').split(",");
			var userId = res[0];
			var circleid = res[1];
            console.log(res);
            setTimeout(function() {
                e.target.classList.remove('loading');
                e.target.setAttribute('data-label', 'Deleted');
            }, 1000);
				$.ajax({
						async: true,
						url: 'api/friends/circles/delete_from_circle.php',
						type: 'POST',
						data: {'id': userId, 'circleid': circleid},
						success: setTimeout(function(data) {
							console.log(data);
							location.reload();
						}, 2000),
						error: function(xhr, desc, err) {
							//console.log(xhr);
							//console.log('Details: ' + desc + '\nError:' + err);
						}
					});
            e.target.removeEventListener('click', loading);
        };
	
	$('#newcirclebutton').click(function() {
		var circlename = $('#newcirclename').val();
		$.ajax({
						async: true,
						url: 'api/friends/circles/create_circle.php',
						type: 'POST',
						data: {'id': userId, 'name': circlename},
						success:function(data) {
							console.log(data);
							//location.reload();
						},
						error: function(xhr, desc, err) {
							//console.log(xhr);
							//console.log('Details: ' + desc + '\nError:' + err);
						}
					});
	});
});