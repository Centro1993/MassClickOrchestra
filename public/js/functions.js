let bars = 20;

function createGrid(bars) { //Erstellt Grid

	var tones = bars * 12;
	var x;
	var y;

	for (var i = 0; i < tones; i++) { // erstellen der Töne + Bezeichnung
		x = Math.floor(i / 12);
		y = i % 12;
		$('.grid').append('<div class="note ' + x + ' / ' + y + ' " ></div>');
	}

	var divs = $('.note'); // Töne ins Spalten wrappen
	for (var j = 0; j < divs.length; j += 12) {
		divs.slice(j, j + 12).wrapAll('<div class=\'barWrapper\'></div>');
	}

	$('.grid').css('width', $('.barWrapper').length * 85); // Grid je nach Größte verlängern

	$('.note').click(function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).html('');
		} else {
			$(this).addClass('active');
		//	var coords = $(this).attr('class').substring($(this).attr('class').indexOf(' '), $(this).attr('class').lastIndexOf(' '));
			$(this).html(coords);
		}
	});
}


//Gibt Array der aktiven Töne zurück

function initialiseActiveNotes() {

	var activeNotes = [];

	//fill active notes with array for each xCoord
	for (let i = 0; i < bars; i++) {
		activeNotes[i] = [];
	}

	$('.active').each(function() {
		var xCoord = parseInt($(this).attr('class').substring($(this).attr('class').indexOf(' '), $(this).attr('class').lastIndexOf('/')));
		var yCoord = parseInt($(this).attr('class').substring(9, $(this).attr('class').lastIndexOf(' ')));

		activeNotes[xCoord].push(yCoord);
		return activeNotes;
	});

	console.dir(activeNotes);

	return activeNotes;
}
