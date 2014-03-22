$(document).ready(function() {
	var user = sessionStorage.getItem('userId');
	var view = sessionStorage.getItem('viewId');

    if(view!='') {
        $('#edit-circle-wrapper').hide();
    }

	    $.ajax({
        async: false,
        url: 'api/albums/get_albums.php',
        type: 'GET',
        data: {
            'userId': user,
            'viewId': view
        },
        success: function(data) {
            console.log(data);
            var circles = JSON.parse(data);
            for (var i = 0; i < circles.length; i++) {
                var circle = $('<div>', {
                    id: circles[i].Id,
                    class: "circle",
                });
                var circleName1 = $('<h1>', {
                    id: circles[i].Id,
                    html: circles[i].Name
                });
                var circleName2 = $('<h2>', {
                    id: circles[i].Id,
                    html: circles[i].Name
                });
                circle.append(circleName1);
                circle.append(circleName2);
                $('#mycircles').append(circle);
                circle.click(function(e) {
                    $("#circlemembers").empty();
                    console.log(e);
                    e.preventDefault();
                    e.stopPropagation();
                    var circleid = e.target.getAttribute('id');
                    $.ajax({
                        async: true,
                        url: 'api/albums/get_photos.php',
                        type: 'GET',
                        data: {
                            'albumid': circleid
                        },
                        success: function(data) {
                            console.log(data);
                            var photos = JSON.parse(data);
                            for (var i = 0; i < photos.length; i++) {
                                console.log(photos[i]);
                                // Comments
                                var bodytext = $('<p>', {
                                    html: ''
                                });
                                var date = $('<h4>', {
                                    html: photos[i].CreationDate
                                });
                                var name = $('<h3>', {
                                    html: photos[i].Name
                                });
                                var addButton = $('<div>', {
                                    id: photos[i].Id,
                                    class: "button",
                                    'data-label': "Delete"
                                });
                                addButton.click(loading);
                                var ribbonhovertext = $('<div/>', {
                                   class: 'ribbon-hover-text',
                                    style: "background-color:#4daf7c",
                                    id: photos[i].Id.toString()
                                });
                                var ribbon = $('<div/>', {
                                    id: photos[i].Id.toString(),
                                    class: 'ribbon'
                                });
                                ribbonhovertext.append(name);
                                ribbonhovertext.append(date);
                                ribbonhovertext.append(addButton);
                                ribbonhovertext.append(bodytext);
                                ribbon.append(ribbonhovertext);
                                var profileimage = $('<div/>', {
                                    class: 'profile-image ribbon-text',
                                    style: "background-image:url('"+photos[i].Path+"'); background-size: 100% 100%;"
                                });
                                ribbon.append(profileimage);
                                $("#circlemembers").append(ribbon);
                            }
                    
                                    //html: 'Add Photo' + circleid
                        if(view=='') {
                            var ribbonhovertext = $('<div/>', {
                                   class: 'ribbon-hover-text',
                                    style: "background-color:#4daf7c",
                            });
                            
                                ribbonhovertext.append('<form id="picform" action="helpers/echo.php" method="post" enctype="multipart/form-data"><input type="hidden" name="AlbumId" value="'+circleid+'"><input type="text" name="picName" value="Picture Name"></br><input type="file" name="uploadedfile"></br><input type="submit" value="Upload Image"></form>');

                                var ribbon = $('<div/>', {
                                    class: 'ribbon'
                                });
                            
                            ribbon.append(ribbonhovertext);
                            var profileimage = $('<div/>', {
                                    class: 'profile-image ribbon-text',
                                    style: "background-image:url('../img/add.jpg'); background-size: 100% 100%;"
                                });
                            ribbon.append(profileimage);
                            $("#circlemembers").append(ribbon);
                        }
                        },
                        error: function(xhr, desc, err) {
                            console.log(xhr);
                            console.log('Details: ' + desc + '\nError:' + err);
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
			var photoId = e.target.getAttribute('id');
            setTimeout(function() {
                e.target.classList.remove('loading');
                e.target.setAttribute('data-label', 'Deleted');
            }, 1000);
				$.ajax({
						async: true,
						url: 'api/albums/delete_photo.php',
						type: 'POST',
						data: {'id': photoId},
						success: setTimeout(function(data) {
							console.log(data);
							location.reload();
						}, 2000),
						error: function(xhr, desc, err) {
							console.log(xhr);
							console.log('Details: ' + desc + '\nError:' + err);
						}
					});
            e.target.removeEventListener('click', loading);
    };
	
	$('#newcirclebutton').click(function() {
		var circlename = $('#newcirclename').val();
        var accessright = $('#accessRight').val();
		$.ajax({
						async: true,
						url: 'api/albums/create_album.php',
						type: 'POST',
						data: {'id': user, 'name': circlename, 'accessright' : accessright},
						success:function(data) {
							console.log(data);
							location.reload();
						},
						error: function(xhr, desc, err) {
							console.log(xhr);
							console.log('Details: ' + desc + '\nError:' + err);
						}
					});
	});
});