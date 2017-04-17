var sound = new Howl({
  src: ['./sounds/beep6.mp3'],

    onloaderror: function(error) {
        console.log('Howler encountered error: ', error);
    }
});

sound.play();
