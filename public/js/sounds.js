/* SOUND LOGIC */

//length of a bar
const soundLength = 2667;

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

sound.isPlayingFlag = false;
//save all sound-id's here
sound.pitchArray = [];

/* TRACK LOGIC */

let pauseResumeStartTrack = function(track) {
	if (track !== null) {
		playTrack(track);
	} else if (sound.isPlayingFlag) {
		console.log('pause');
		sound.pause();
	} else {
		console.log('resume');
		sound.play();
	}
	sound.isPlayingFlag = !sound.isPlayingFlag;
};

let playTrack = function(currTrack) {

	let currPos = 0;

	let playBar = function(track, currPos) {
		console.log(currPos);
		track[currPos].forEach((ele, ind, arr) => {
			sound.pitchArray[ele] = sound.play('pitch-' + ele);
		});
		++currPos;

		if (currPos >= bars) {
			currPos = 0;
			sound.isPlayingFlag = false;
			sound.pitchArray = [];
		} else {
			window.setTimeout(playBar.bind(null, track, currPos), soundLength / 4);
		}
	};

	playBar(currTrack, currPos);
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
