/* SOUND LOGIC */

//length of a bar
const soundLength = 2000;

function setSprites() {
	let obj = {};

	for (let i = 0; i <= 11; i++) {
		let begin = soundLength * i;
		let end = soundLength;
		obj['pitch-' + (i + 1)] = [begin, end];
	}

	return obj;
}

var sound = new Howl({
	src: ['./sounds/piano.wav', './sounds/piano.mp3', './sounds/piano.webm'],
	sprite: setSprites(),
	onloaderror: function(error) {
		console.log('Howler encountered error: ', error);
	}
});

//current track state
sound.isPlayingFlag = false;
sound.position = 0;
//save all sound-id's here
sound.pitchArray = [];

/* TRACK LOGIC */

sound.playTrack = function() {

	//disable slider while track is playing
	slider.disabled = true;

	let playBar = function() {
		//get slider value
		sound.position = slider.value;

		//get the active pitches from the next bar
		activeNotes = getActiveNotesForBar(sound.position);

		//play all pitches from the next bar
		activeNotes.forEach((ele, ind, arr) => {
			sound.pitchArray[ele] = sound.play('pitch-' + ele);
		});
		++sound.position;

		if(!sound.isPlayingFlag) {
			sound.pauseTrack();
		}
		else if (sound.position >= bars) {
			sound.position = 0;
			window.setTimeout(playBar.bind(null), soundLength / 4);
		}
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
