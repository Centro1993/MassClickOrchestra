/* SOUND LOGIC */

//length of a bar
const soundLength = 2000;

//cut one long soundfile into many smaller sprites, seprated by tone and instrument
function setSprites() {
	let obj = {};

	instruments.forEach((ele, ind, arr) => {
		console.log(ele);
		console.log(ind);
		for (let i = 0; i <= toneAmount; i++) {
			console.log(i);
			let begin = soundLength * i + (toneAmount * ind * soundLength);
			console.log(begin);
			let end = soundLength;
			obj['pitch-' + (i + 1) +'-'+ele] = [begin, end];
		}
	});
	console.dir(obj);

	return obj;
}

var sound = new Howl({
	src: ['./sounds/all_mix.mp3', './sounds/all_mix.webm'],
	sprite: setSprites(),
	onloaderror: function(error) {
		console.log('Howler encountered error: ', error);
	}
});

//current track state
sound.isPlayingFlag = false;
sound.position = 0;
sound.instrument = 'piano';
//save all sound-id's here
sound.pitchArray = [];

/* TRACK LOGIC */

sound.playTrack = function() {

	//disable slider while track is playing
	slider.disabled = true;

	let playBar = function() {
		//get slider value
		sound.position = slider.value;

		//get active instrument
		sound.instrument = $('#instrumentSelect').val();

		console.log(sound.instrument);

		//reset soundposition if at the end of bars
		if (sound.position == bars) {
			sound.position = 0;
		}

		//get the active pitches from the next bar
		activeNotes = getActiveNotesForBar(sound.position);

		//play all pitches from the next bar
		activeNotes.forEach((ele, ind, arr) => {
			sound.pitchArray[ele] = sound.play('pitch-' + ele + '-'+ sound.instrument);
			//set fades at beginning and end for new sound
			sound.fade(0.0, 1.0, 50, sound.pitchArray[ele]);
			sound.fadeAfterTime(1.0, 0.0, 400, sound.pitchArray[ele], soundLength - 400);
		});
		++sound.position;

		if (!sound.isPlayingFlag) {
			sound.pauseTrack();
		}
		//autorepeat if autorepeatcheckbox is set
		else if (sound.position >= bars && $('.loopCheckBox').prop('checked')) {
			sound.position = 0;
			window.setTimeout(playBar.bind(null), soundLength / 4);
		} //pause if autorepeat is not set
		else if (sound.position >= bars) {
			//reenable slider
			slider.disabled = false;

			//empty array for active sound id's
			sound.pitchArray = [];

			//reset play button
			$('.playButton').removeClass('pause');
		}
		//play next bar
		else {
			window.setTimeout(playBar.bind(null), soundLength / 4);
		}

		//set new slider position
		slider.value = sound.position;
	};

	playBar();
};

sound.pauseTrack = function() {
	//reenable slider
	slider.disabled = false;

	//stop all sounds
	sound.stop();
	//empty array for active sound id's
	sound.pitchArray = [];
};

sound.toggleTrack = function() {
	sound.isPlayingFlag = !sound.isPlayingFlag;
	if (sound.isPlayingFlag) {
		console.log('play');
		sound.playTrack();
	} else {
		console.log('pause');
		sound.pauseTrack();
	}
};

//fade a certain sound after a set amount of timeg
sound.fadeAfterTime = function(volIn, volOut, duration, id, timeStart) {
	window.setTimeout(
		function() {
			sound.fade(volIn, volOut, duration, id);
		},
		timeStart
	);
};

/* DEBUG SPACE */

/*
console.log('wululu');

let pitch1 = sound.play('pitch-8');
isPlayingFlag = true;

setTimeout(function() {
	pauseResumeTrack();
}, soundLength / 4);

setTimeout(function() {
	pauseResumeTrack();
}, soundLength);
*/
//sound.fade(1, 0, 500, pitch1);
