let bars = 20;

function createGrid(bars) { //Erstellt Grid

	var tones = bars * 12;
	var x;
	var y;

	for (var i = 0; i < tones; i++) { // erstellen der Töne + Bezeichnung
		x = Math.floor(i / 12);
		y = i % 12;
		$('.grid').append('<div class="note ' + x + 'x' + y + ' " ></div>');
	}

	var divs = $('.note'); // Töne ins Spalten wrappen
	for (var j = 0; j < divs.length; j += 12) {
		divs.slice(j, j + 12).wrapAll('<div class=\'barWrapper\'></div>');
	}

	$('.grid').css('width', $('.barWrapper').length * 85); // Grid je nach Größte verlängern

	$('.note').click(function() {

		let coords = this.className.split(/\s+/)[1].split('x');
		console.log(coords);
		xCoord = coords[0];
		yCoord = coords[1];

		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			//tell server that note is not active
			emitTone({
				x: xCoord,
				y: yCoord,
				active: false
			});
		} else {
			$(this).addClass('active');

			//tell server that note is active
			emitTone({
				x: xCoord,
				y: yCoord,
				active: true
			});

			//	var coords = $(this).attr('class').substring($(this).attr('class').indexOf(' '), $(this).attr('class').lastIndexOf(' '));
			//	$(this).html(coords);
		}
	});
}


//Gibt Array der aktiven Töne zurück

function getActiveNotesForBar(barPosition) {

	var activeNotes = [];

	//fill active notes with array for each xCoord
	for (let i = 0; i < bars; i++) {
		activeNotes[i] = [];
	}

	$('.active').each(function() {
		let coords = this.className.split(' ')[1].split('x');

		var xCoord = parseInt(coords[0]);
		var yCoord = parseInt(coords[1]);

		activeNotes[xCoord].push(yCoord);
		return activeNotes[barPosition];
	});

	console.dir(activeNotes[barPosition]);

	return activeNotes[barPosition];
}

//set active tones intially
initializeGrid = function(grid) {
	//iterate grid class name (which are in the keys)
	Object.keys(grid).forEach((key, ind) => {
		//if grid tone is active, add active class to grid
		if(grid[key]) {
			$('.'+key).addClass('active');
		}
	});
};

//set active tone class
setToneActive = function(tone) {
	console.log(tone);
	if (tone.active) {
		$('.' + tone.x + 'x' + tone.y).addClass('active');
		var user = tone.user;
		console.log(user);
		$('.' + tone.x + 'x' + tone.y).addClass('user'+user);
		var r = 255/user;
		var g = 255/user;
		var b = 255/user;
		$('.' + tone.x + 'x' + tone.y).css('background',(r,g,b));
	} else {
		$('.' + tone.x + 'x' + tone.y).removeClass('active');
	}
};
