$(document).ready(function() {

	//save slider
	let slider = document.getElementById('slider');

	$('.backgroundWrapp, .curtainLeft, .curtainRight').height($(window).height());
	setTimeout(function() {
		$('.curtainLeft').css('left', '-330px');
		$('.curtainRight').css('right', '-330px');
	}, 500);

	$('.box').hover(function() {
		$(this).css('opacity', '0.9');

	}, function() {
		$(this).css('opacity', '0.5');
		if ($(this).hasClass('active')) {
			$(this).css('opacity', '0.8');
		}
	});

	$('.playButton').click(function() {
		sound.toggleTrack();
		if(sound.isPlayingFlag){
			$('.playButton').addClass('pause');
		}
		else{
			$('.playButton').removeClass('pause');
		}
	});
	
	url  = window.location.href;
	if(url.indexOf('error=404') != -1){
		$('.notFound').show();
	}
	//Drag Detection
	var isDragging = false;
	var xcoordStart;
	var xcoordEnd;
	// $('.note')
	// 	.mousedown(function(e) {
	// 		isDragging = false;
	// 		xcoordStart = e.pageX;
	// 		console.log('mousedown');
	//
	// 	})
	// 	.mousemove(function(e) {
	// 		isDragging = true;
	// 		xcoordEnd = e.pageX;
	// 	})
	// 	.mouseup(function() {
	// 		var wasDragging = isDragging;
	// 		console.log('mouseup');
	// 		isDragging = false;
	// 		if (!wasDragging) {
	// 			console.log('start: ' + xcoordStart + ' end: ' + xcoordEnd);
	// 		}
	// 	});

});
