$(document).ready(function() {

<<<<<<< Updated upstream
	$('.backgroundWrapp').height($(window).height());
=======
  $('.backgroundWrapp, .curtainLeft, .curtainRight').height($(window).height());
  setTimeout(function(){
      $('.curtainLeft').css('left','-330px');
      $('.curtainRight').css('right','-330px');
  },500);
>>>>>>> Stashed changes

	$('.box').hover(function() {
		$(this).css('opacity', '0.9');

	}, function() {
		$(this).css('opacity', '0.5');
		if ($(this).hasClass('active')) {
			$(this).css('opacity', '0.8');
		}
	});

	$('.playButton').click(function() {
		var activeNotes = initialiseActiveNotes();
		pauseResumeStartTrack(activeNotes);
	});


  //Drag Detection
  var isDragging = false;
  var xcoordStart;
  var xcoordEnd;
  $(".note")
  .mousedown(function(e) {
      isDragging = false;
      xcoordStart = e.pageX;
      console.log('mousedown');

  })
  .mousemove(function(e) {
      isDragging = true;
      xcoordEnd = e.pageX;
   })
  .mouseup(function() {
      var wasDragging = isDragging;
      console.log('mouseup');
      isDragging = false;
      if (!wasDragging) {
          console.log('start: '+ xcoordStart + ' end: ' + xcoordEnd);
      }
  });

});
