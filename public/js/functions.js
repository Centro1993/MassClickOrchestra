function createGrid(takte) {
  for(var i=0; i < takte ; i++){
    $('.grid').append('<div class="takte"></div>');
  }
  for(var i=0; i < 48 ; i++){
    $('.takte').append('<div class="box"></div>');
  }
  var taktWidth = $('.takte').width();
  $('.grid').width(taktWidth*takte+takte*10);
  $('.box').each(function(i, value){
    $(this).addClass('B'+i);
  });


  $('.box').click(function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      $(this).html('');
    }else{
      $(this).addClass('active');
      $(this).html($(this).attr('class').split(' ')[1]);
    }
  });
}
