// ===============
// Dependencies
// ===============

var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	server = require('http').createServer(app),
	errorHandler = require('errorhandler'),
	methodOverride = require('method-override'),
	hostname = process.env.HOSTNAME || 'localhost',
	PORT = 8084,
	publicDir = process.argv[2] || __dirname + '/public',
	path = require('path'),
	exphbs = require('express-handlebars'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	expressLess = require('express-less'),
	io = require('socket.io')(http, {
		serveClient: false
	});



// ====================
// Express Config
// ====================

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.use('/css', expressLess(publicDir + '/less', {
	cache: false,
	debug: true
}));
app.set('view engine', 'handlebars');
app.set('port', PORT);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
	dumpExceptions: true,
	showStack: true
}));
app.use(session({
	secret: 'wululululululu',
	resave: false,
	saveUninitialized: true
}));

// require Routes in ./controllers
app.use(require('./controllers'));

app.start = app.listen = function() {
	return server.listen.apply(server, arguments);
};

// ====================
// Socket.io
// ====================
let grids = [];
let clientLastInteraction = {};
let socketRooms = {};

/* NOT USED
const INTERACTIONWAITINGTIME = 5000; //time for client to wait after setting a bar

//check if client is allowed to set a new bar
var waitingTimeCheck = function(socket) {
	if (typeof clientLastInteraction[socket.id] !== 'undefined') {
		if (Date.now() - clientLastInteraction[socket.id] > INTERACTIONWAITINGTIME) {
			clientLastInteraction[socket] = Date.now();
			return true;
		} else {
			return false;
		}
	} else {
		clientLastInteraction[socket.id] = Date.now();
		return true;
	}
};
*/

//create and return a new grid or an existing one
let getGrid = function(room) {
	if(typeof grids[room] === 'undefined') {
		grids[room] = {
			lastChangedTimestamp: Date.now(),
			userList: []
		};
	}

	return grids[room];
};

//this function assigns and return a unique user id for each socket in a room
let getUserId = function(room, socketId) {

	if(grids[room].userList.indexOf(socketId) < 0) {
		grids[room].userList.push(socketId);
		return grids[room].userList.length-1;
	} else {
		return grids[room].userList.indexOf(socketId);
	}
};

//connection handling
io.on('connection', function(socket) {

	socket.on('initialize', function(msg) {
		console.log(msg.room);
		//join room
		socket.join(''+msg.room);
		//save room of socket
		socketRooms[socket.id] = msg.room;

		//create grid if it does n0t exist
		let room = getGrid(msg.room);
		console.log(room);
		//send grid of room to user
		socket.emit('grid', room);
	});

	//receive new tone from client
	socket.on('tone', function(tone) {
		console.log(tone);
		console.log(socket.id);
		let room = socketRooms[socket.id];
		let grid = getGrid(room);

		let newTone = {
			active: tone.active,
			userId: getUserId(room, socket.id),
			x: parseInt(tone.x),
			y: parseInt(tone.y)
		};

		console.log(newTone);

		//set tone in grid
		grid[tone.x+'x'+tone.y] = newTone;

		//set last changed timestamp in grid
		grid.lastChangedTimestamp = Date.now();

		//tell other group clients what has changed
		io.to(room).emit('tone', newTone);
	});

});

// ====================
// Export Variables
// ====================

exports.grids = grids;

// ====================
// Start Server
// ====================

//start socket.io listener
http.listen(PORT, function() {
});

//start express
app.start = app.listen = function() {
	return server.listen.apply(server, arguments);
};

console.log('Server showing %s listening at http://%s:%s', publicDir, hostname, PORT);
