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
  var username = false;
var password = false;
$("#username").on("input", function() {
  if ( $(this).val().length > 0){
   username = true;
  }
  else
  {
    username = false;
  }
  if (username && password)
  {
    $('.login').css('background', '#14a03d');
    $('.login').addClass('buttonafter');
  }
  else
  {
    $('.login').css('background', '#a0a0a0');
    $('.login').removeClass('buttonafter');
  }
});

$("#password").on("input", function() {
 if ( $(this).val().length > 0){
   password = true;
  }
  else
  {
    password = false;
  }
    if (username && password)
  {
    $('.login').css('background', '#14a03d');
    $('.login').addClass('buttonafter');
  }
  else
  {
    $('.login').css('background', '#a0a0a0');
    $('.login').removeClass('buttonafter');
  }
});
});

