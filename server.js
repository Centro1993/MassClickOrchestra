
// ===============
// Dependencies
// ===============

var express         = require("express"),
    app             = express(),
    server          = require('http').createServer(app),
    errorHandler    = require('errorhandler'),
    methodOverride  = require('method-override'),
    hostname        = process.env.HOSTNAME || 'localhost',
    PORT            = 8084,
    publicDir       = process.argv[2] || __dirname + '/public',
    path            = require('path'),
    exphbs          = require('express-handlebars'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    less            = require('express-less');



// ====================
// Express Config
// ====================

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
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
app.use(session({ secret: "wululululululu", resave: false, saveUninitialized: true }));

// require Routes in ./controllers
app.use(require('./controllers'));

app.start = app.listen = function(){
    return server.listen.apply(server, arguments);
};

// ====================
// Start Server
// ====================

app.start(PORT);
console.log("Server showing %s listening at http://%s:%s", publicDir, hostname, PORT);
