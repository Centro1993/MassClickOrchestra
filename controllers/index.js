var express = require('express');
var router = express.Router();
var chron = require('async');

router.get('/', function(req, res) {
	//render the home view
	res.render('index', []);
});

module.exports = router;
