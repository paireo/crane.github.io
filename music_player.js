// Dependencies:
// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js
// https://cdnjs.cloudflare.com/ajax/libs/plyr/2.0.18/plyr.js


jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://paireo.org/paireo/paireo/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Test1 ",
                "duration": "2:46",
                "file": "running1"
            }, {
                "track": 2,
                "name": "Test2 ",
                "duration": "8:30",
                "file": "langley"
            }, {
                "track": 3,
                "name": "Test3 ",
                "duration": "5:01",
                "file": "patches"
            }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<p><div class="plItem">' + trackNumber + '. </span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></p>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

// initialize plyr
plyr.setup($('#audio1'), {});
