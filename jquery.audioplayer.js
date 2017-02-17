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

            audio = new Audio(url);

            var startAudio = function () {
                audio.play();
                
                document.removeEventListener("touchstart", startAudio, false);
            }

            var pauseAudio = function () {
                audio.pause();
                audio.removeEventListener("play", pauseAudio, false);
            }
            // Start playing audio when the user clicks anywhere on the page,
            // to force Mobile Safari to load the audio.
            document.addEventListener("touchstart", startAudio, false);
            audio.addEventListener("play", pauseAudio, false);
        }

        this.play = function () {

            if (audio) {
                audio.play();
            } else {

                $('.audio-player').remove();

                $(
                   '<audio class="audio-player" autoplay="autoplay" style="display:none;">'
                     + '<source src="' + url + '" />'
                     + '<embed src="' + url + '" hidden autostart="true" loop="false"/>'
                     + '</audio>'
                 ).appendTo('body');
            }
        }
    }
