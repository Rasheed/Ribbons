$(function() {

	$('#newm').hide();
	
  var userId=sessionStorage.getItem('userId');
  // Get all friends that sent messages or you sent messages to
  $.ajax({
      url: 'api/messages/get_users.php',
      type: 'GET',
      data: {'id': userId},
      dataType: 'json',
      success: function(data) {
        for(var i=0; i<data.length; i++){
          $('#friends').append('<li><a data-type="'+data[i]['Type']+'"data-title="'+data[i]['Id']+'">'+data[i]['Name']+'</a></li>');
        }
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log('Details: ' + desc + '\nError:' + err);
      }
  });

  // Get the messages from the clicked user
  $('body').on("click", "nav ul li a", function(){
    var title = $(this).html();
    $('.title').children('h2').html(title);
    $('.larg').empty();
    if(title!="New Message") {
      var type = $(this).data('type');
      var user = $(this).data('title');
      if(type=='Personal') {
        $.ajax({
          url: 'api/messages/get_personal_messages.php',
          type: 'GET',
          data: {'id': userId, 'user':user},
          dataType: 'json',
          success: function(data) {
            for(var i=0; i<data.length; i++){   
              if(data[i]['to']) {
                $('.larg').prepend('<div><h3>'+title+': '+data[i]['Content']+'</h3></div>');
              } else {
                $('.larg').prepend('<div><h3>You: '+data[i]['Content']+'</h3></div>');
              }
            }
          },
          error: function(xhr, desc, err) {
            console.log(xhr);
            console.log('Details: ' + desc + '\nError:' + err);
          }
        });
      } else {
        $.ajax({
          url: 'api/messages/get_group_messages.php',
          type: 'GET',
          data: {'id': userId, 'groupId':user, 'type':type},
          dataType: 'json',
          success: function(data) {
            for(var i=0; i<data.length; i++){
              $('.larg').prepend('<div><h3>'+data[i]['FirstName']+' '+data[i]['LastName']+': '+data[i]['Content']+'</h3></div>');
            }
          },
          error: function(xhr, desc, err) {
            console.log(xhr);
            console.log('Details: ' + desc + '\nError:' + err);
          }
        });
      }
      $('.larg').prepend('<div><form><input type="text" id="content"><button data-to="'+user+'" data-type="'+type+'" id="send_message">Send Message</button></form></div>');
    } else {
      $('#newm').show();
    }
  });

  $(document).on('click', '#new_message', function(e) {
    e.preventDefault();
    e.stopPropagation();
    // From userId
    // Content
    var content = $('#mcontent').val();
    // Type
    if($('#mtype').val()=='friend') {
      type='Personal';
    } else if($('#mtype').val()=='circle') {
      type='Circle';
    } else {
      type='Group';
    }
  });

  $(document).on('click', '#send_message', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var type = $(this).data('type');
    var to = $(this).data('to');
    var content = $('#content').val();
    $.ajax({
      url: 'api/messages/add_message.php',
      type: 'GET',
      data: {'to':to, 'from':userId, 'content':content, 'type':type},
      dataType: 'json',
      success: function(data) {
        if(data['message_sent'])
          console.log("DONE: "+to+" "+userId+" "+content+" "+type);
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log('Details: ' + desc + '\nError:' + err);
      }
    });
  });
  
  $(document).on('click', '#new_message', function(e) {
	console.log(e);
    e.preventDefault();
    e.stopPropagation();
    var type = "Personal";
    var to=sessionStorage.getItem('recipientId');
    var content = $('#mcontent').val();
	console.log("Sending: "+to+" "+userId+" "+content+" "+type);

    $.ajax({
      url: 'api/messages/add_message.php',
      type: 'GET',
      data: {'to':to, 'from':userId, 'content':content, 'type':type},
      dataType: 'json',
      success: function(data) {
        if(data['message_sent'])
          console.log("DONE: "+to+" "+userId+" "+content+" "+type);
		  $('#newm').hide();
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        //console.log('Details: ' + desc + '\nError:' + err);
      }
    });
  });
});