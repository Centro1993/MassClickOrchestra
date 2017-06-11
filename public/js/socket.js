//Socket.io connection handling
let grid;
let initializeGrid;
let setToneActive;
let emitTone;
let socket = io();


//add url param function to jquery
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
};

//get room from url param
let room = $.urlParam('room');

//tell server to send grid
socket.emit('initialize', {
	room: room
});

//receive grid
socket.on('grid', function(msg) {
	grid = msg;
	console.log(grid);
	//build grid
	initializeGrid(grid);
});

//receive new tone
socket.on('tone', function(tone) {
	console.log(tone);
	//set tone active in grid
	setToneActive(tone);
});

emitTone = function(tone) {
	socket.emit('tone', {
		x: tone.x,
		y: tone.y,
		active: tone.active,
	});
};
