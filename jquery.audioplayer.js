/**
 * @author Dongdong Yang <hi@dongdong.ca>
 * Copyright (c) 2017 Dongdong Yang - released under MIT License
 * https://github.com/stupidong/jquery.audioplayer.js
 * Usage: var player= new AudioPlayer('http://example.org/sound')
 * player.play();
**/

 //  $.browser.webkit is removed after jquery 1.9
 var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

 var AudioPlayer = function (path) {

        var url = path;
        var audio;

        if (isSafari) {
            //Thanks to mrpanda in http://stackoverflow.com/questions/10951524/play-and-replay-a-sound-on-safari-mobile
            audio = new Audio(url);

            var startAudio = function () {
                audio.play();
                
                //unload event once loading started.
                document.removeEventListener("touchstart", startAudio, false);
            }

            var pauseAudio = function () {
                audio.pause();
                //unload event once safari start loading audio file
                audio.removeEventListener("play", pauseAudio, false);
            }
            // Start playing audio when the user clicks anywhere on the page,
            // to force Mobile Safari to load the audio.
            document.addEventListener("touchstart", startAudio, false);
         
            // pause immediately once safari start loading audio file 
            audio.addEventListener("play", pauseAudio, false);
        }

        this.play = function () {

            if (audio) {
                audio.play();
            } else {

                $('.audio-player').remove();
             
                // Thanks to admsev in https://github.com/admsev/jquery-play-sound/blob/master/jquery.playSound.js
                // This is simplest way to play in most old and new browser.
                // but if you need pause/stop audio, you need to try other codes.
                $(
                   '<audio class="audio-player" autoplay="autoplay" style="display:none;">'
                     + '<source src="' + url + '" />'
                     + '<embed src="' + url + '" hidden autostart="true" loop="false"/>'
                     + '</audio>'
                 ).appendTo('body');
            }
        }
    }
