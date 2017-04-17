function createGrid(takte) {
  for(var i=0; i < takte ; i++){
    $('.grid').append('<div class="takte"></div>');
  }
  for(var i=0; i < 48 ; i++){
    $('.takte').append('<div class="box"></div>');
  }

  var taktWidth = $('.takte').width();
  console.log(taktWidth);
  $('.grid').width(taktWidth*takte+takte*10);
}
