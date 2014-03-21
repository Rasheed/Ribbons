$(document).ready(function() {
    var userId = 11; //sessionStorage.getItem('userId');
    //console.log(userId);
    $.ajax({
        async: false,
        url: 'api/friends/get_friends.php',
        type: 'GET',
        data: {
            'id': userId
        },
        success: function(data) {
            //console.log(data);
            var friends = JSON.parse(data);
            var friendnumber = $('<div/>', {
				html: "_"
            });
            $("#main-wrapper").append(friendnumber);
            for (var i = 0; i < friends.length; i++) {
                //console.log(friends[i]);
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
});