let soundLength = 2667;

function setSprites() {
  let obj = {};

  for(let i=0; i <=11; i++) {
    let begin = soundLength*i;
    let end = soundLength;
    obj['pitch-'+(i+1)] = [begin, end];
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

let pitch1 = sound.play('pitch-8');
setTimeout(() => {
  //sound.fade(1, 0, 200, pitch1);
}, 2470);

setTimeout(function() {
    let pitch2 = sound.play('pitch-2');
}, 1000);

//sound.fade(1, 0, 500, pitch1);
