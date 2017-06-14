let bars = 20;
let userColors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'Darkorange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];

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
			//$(this).removeClass('active');
			//tell server that note is not active
			emitTone({
				x: xCoord,
				y: yCoord,
				active: false
			});
		} else {
			//$(this).addClass('active');

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
		let tone = grid[key];
		//if grid tone is active, add active class and user dependent color to grid
		if (tone.active) {
			$('.' + tone.x + 'x' + tone.y).addClass('active');

			let color = userColors[tone.userId];

			$('.' + tone.x + 'x' + tone.y).css('background', color);
		}
	});
};

//set active tone class
setToneActive = function(tone) {
	console.log(tone);
	if (tone.active) {
		$('.' + tone.x + 'x' + tone.y).addClass('active');

		let user = parseInt(tone.userId);

		//$('.' + tone.x + 'x' + tone.y).addClass('user' + user);

		//if there is a preset css color for user take one, else create random color
		let color;
		if (user < userColors.length) {
			color = userColors[user];
		} else {
			color = 'rgb('+Math.random() * (255 - 1) + 1+', '+Math.random() * (255 - 1) + 1+', ' +Math.random() * (255 - 1) + 1+ ')';
		}

		$('.' + tone.x + 'x' + tone.y).css('background', color);
	} else {
		$('.' + tone.x + 'x' + tone.y).removeClass('active');
		//set default color
		$('.' + tone.x + 'x' + tone.y).css('background', '#444');
	}
};
