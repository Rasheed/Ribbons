$(function(){
	$('#login').on('click', function(e){
    e.preventDefault();
	var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
	alert(username);
    $.ajax({
      url: 'php/registration/check_login.php',
      type: 'post',
      data: {'action': 'check_login', 'username': username, 'password': password},
      success: function(data, status) {
		console.log(data);
		console.log(status);
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
  });
});