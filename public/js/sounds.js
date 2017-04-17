var sound = new Howl({
  src: ['./sounds/piano.wav'],

    onloaderror: function(error) {
        console.log('Howler encountered error: ', error);
    }
});

let id1 = sound.play();

sound.fade(1, 0, 500, id1);
