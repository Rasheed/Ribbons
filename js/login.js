$(function() {
  $('.login').on('click', function(e) {
    e.preventDefault();
    var username = $('#user').val();
    var password = $('#pass').val();
    // Regex needs to be checked. 
    var emailreg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    if(username == '') {
      alert('You have not entered an email.');
      return false;
    }
    if(!emailreg.test(username)) {
      alert('Email entered has an incorrect format.');
      return false;
    }
    if(password == '') {
      alert('You have not entered a password.');
      return false;
    }

    $.ajax({
      url: 'api/login/check_login.php',
      type: 'post',
      data: {'username': username, 'password': password},
      dataType: 'json',
        success: function(data) {
          console.log(data.isUser);
          if(eval(data.isUser)) {
            console.log('Moving to homepage');
			console.log(data.Id);
            sessionStorage.setItem('userId',data.Id);
            window.location.href='home.html';
          }
          if(!eval(data.isUser)) {
            alert('Incorrect log in information');
          }
        },
        error: function(xhr, desc, err) {
          console.log(xhr);
          console.log('Details: ' + desc + '\nError:' + err);
        }
    });
    return true;
  });

  var username = false;
  var password = false;
  $('#username').on('input', function() {
    if ( $(this).val().length > 0) {
      username = true;
    } else {
      username = false;
    }
    if (username && password) {
      $('.login').css('background', '#14a03d');
      $('.login').addClass('buttonafter');
    } else {
      $('.login').css('background', '#a0a0a0');
      $('.login').removeClass('buttonafter');
    }
  });

  $('#password').on('input', function() {
    if ( $(this).val().length > 0) {
      password = true;
    } else {
      password = false;
    }
    if (username && password) {
      $('.login').css('background', '#14a03d');
      $('.login').addClass('buttonafter');
    } else {
      $('.login').css('background', '#a0a0a0');
      $('.login').removeClass('buttonafter');
    }
  });
});