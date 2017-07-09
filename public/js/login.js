$(document).ready(function() {
	$('.backgroundWrapp').height($(window).height());
	$('.backgroundWrapp').css('background-image','url(/images/backgroundindex.jpeg)');
	url  = window.location.href;
	if(url.indexOf('error=404') != -1){
		$('.notFound').show();
	}
});
