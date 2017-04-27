$( document ).ready(function() {

  $('.backgroundWrapp').height($(window).height());

  $('.box').hover(function(){
    $(this).css('opacity','0.9');

  },function(){
    $(this).css('opacity','0.5');
    if($(this).hasClass('active')){
      $(this).css('opacity','0.8');
    }
  });

  $('.playButton').click(function(){
    var activeNotes = initialiseActiveNotes();
    pauseResumeStartTrack(activeNotes);
  });

});
