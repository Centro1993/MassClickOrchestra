$( document ).ready(function() {
  $('.box').hover(function(){
    $(this).css('opacity','0.8');

  },function(){
    $(this).css('opacity','0.3');
    if($(this).hasClass('active')){
      $(this).css('opacity','0.6');
    }
  });
});
