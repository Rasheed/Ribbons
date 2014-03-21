$(document).ready(function () {
    var comment = $('#blogpost textarea'),
        counter = '',
        counterValue = 140, //change this to set the max character count
        minCommentLength = 10, //set minimum comment length
        $commentValue = comment.val(),
        $commentLength = $commentValue.length,
        submitButton = $('#blogpost input[type=submit]').hide();
  
    $('form').prepend('<span class="counter"></span>').append('<p class="info">Min length: <span></span></p>');
    counter = $('span.counter');
    counter.html(counterValue); //display your set max length
    comment.attr('maxlength', counterValue); //apply max length to textarea
    $('form').find('p.info > span').html(minCommentLength);
    // everytime a key is pressed inside the textarea, update counter
    comment.keyup(function () {
      var $this = $(this);
      $commentLength = $this.val().length; //get number of characters
      counter.html(counterValue - $commentLength); //update counter
      if ($commentLength > minCommentLength - 1) {
        submitButton.fadeIn(200);
      } else {
        submitButton.fadeOut(200);
      }
    });
	
	var showForm = false;
	$("#form").hide();
	$("#pictureforms").hide();
	$("#edit-ribbon").click(function(){
	if(showForm){
		$("#form").hide();
		$("#pictureforms").hide();
		showForm = false;
		} else {
			$("#form").show();
			$("#pictureforms").show();
			showForm = true;
		}
	});

});