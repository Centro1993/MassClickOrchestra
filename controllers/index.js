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
		console.log(roomValue);
		if(typeof roomValue !== 'undefined' && roomValue !== '' ){
			if(roomValue === 'random'){

			}
			else{
				res.redirect('/orchestra?room='+roomValue);
			}
		}
		else{
			res.redirect('/?error=404');
		}
});
module.exports = router;
