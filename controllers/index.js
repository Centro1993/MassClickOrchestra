var express = require('express');
var router = express.Router();
var chron = require('async');

router.get('/', function(req, res) {
    //render the home view
	res.render('login', []);
});

router.get('/orchestra', function(req, res) {
    //render the home view
	res.render('index', []);
});

router.post('/roomservice', function(req, res) {
	var roomValue = req.body.room;

	if(typeof roomValue !== 'undefined' && roomValue !== '' ){
		if(roomValue === 'random'){
			var grids = require('../server.js').grids;
		
			//find last changed grid
			let lastTimestamp = 0;
			let room = 0;

			grids.forEach((grid, roomNr) => {
				if(typeof grid !== 'undefined') {
					if(grid.lastChangedTimestamp > lastTimestamp) {
						lastTimestamp = grid.lastChangedTimestamp;
						room = roomNr;
					}
				}
			});


			res.redirect('/orchestra?room='+parseInt(room));
		}
		else if(!isNaN(parseInt(roomValue))) {
			res.redirect('/orchestra?room='+parseInt(roomValue));
		}
		else{
			res.redirect('/?error=404');
		}
	}
	else{
		res.redirect('/?error=404');
	}
});
module.exports = router;
