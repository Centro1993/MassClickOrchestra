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
let grids = {};
let clientLastInteraction = {};
const INTERACTIONWAITINGTIME = 5000;		//time for client to wait after setting a bar

//check if client is allowed to set a new bar
var waitingTimeCheck = function(socket) {
	if(typeof clientLastInteraction[socket] !== 'undefined') {
		if(Date.now() - clientLastInteraction[socket] > INTERACTIONWAITINGTIME) {
			clientLastInteraction[socket] = Date.now();
			return true;
		} else {
			return false;
		}
	} else {
		clientLastInteraction[socket] = Date.now();
		return true;
	}
};

//connection handling
io.on('connection', function(socket) {

	socket.on('role', function(msg) {

		if (msg.role == 'user') {

			//join group which gets the xy updates
			socket.join('xy');

			console.log(socket.id + ' connected!');

			//add socket to waiting pool
			waitingSockets.push(socket.id);

			//check current controller
			controllerCheck();

			//tell socket whether it is the controller or not
			socket.emit('controlling', {
				control: (socket.id === controllingSocket),
				waitingTime: waitingTimeCheck(socket)
			});

			//send initial values to new user
			socket.emit('initialize', {
				'xy': xy
			});
		} else {
			//join group which gets the xy updates
			console.log('Client joined:');
			console.log(socket.id);

			socket.join('xy');
		}

	});

	//let clients check if the controller has changed
	socket.on('controllercheck', function() {
		controllerCheck();

		//if socket is not controlling, send it its waiting time
		if (controllingSocket !== socket.id) {
			socket.emit('controlling', {
				control: false,
				waitingTime: waitingTimeCheck(socket)
			});
		}
	});

	//replace controller on disconnect/ remove socket from waitinglist
	socket.on('disconnect', function() {
		console.log(socket.id + ' disconnected!');

		//check if socket is controller
		if (socket.id === controllingSocket) {

			//make first socket in waitinglist controller
			controllingSocket = waitingSockets[0];
			controllingTimestamp = Date.now();

			//inform new controlling socket
			io.to(controllingSocket).emit('controlling', {
				control: true
			});
		}

		//check if socket is in waiting list
		removeWaitingIndex = waitingSockets.indexOf(socket.id);

		if (removeWaitingIndex > -1) {
			//remove socket from waiting list
			waitingSockets.splice(removeWaitingIndex, 1);
		}
	});

	//handle incoming values
	socket.on('xy', function(msg) {
		//only process input from currently controlling socket
		if (socket.id === controllingSocket) {

			//refresh afk timer
			lastInputTimestamp = Date.now();

			//broadcast current position to all sockets
			socket.to('xy').emit('xy', {
				'xy': msg.xy
			});

			//save and validate new position, format for arduino
			xy = [parseInt(msg.xy[0]), parseInt(msg.xy[1])];
			xy.forEach(function(e, i, a) {
				//255 / (value / 2)
				e = e * 2.1;
				e = Math.floor(e);
				e = Math.min(255, e);
				e = Math.max(-255, e);
				e = -e;

				xy[i] = e;
			});
			//console.log('R Value: ' + msg);
		}
	});
});

// ====================
// Start Server
// ====================

app.start(PORT);
console.log('Server showing %s listening at http://%s:%s', publicDir, hostname, PORT);
