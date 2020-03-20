var src = "";
var name = "";
var artist = "";
var album = "";
var cover = "";
var next = "";
var time = 0;
var volume = 1;
var sound = null;
var nextSound = null;
mute = false;
start = false;

function backendMute(muteState){
    mute = muteState;
}
function backstarted(){
    start = true;
}

function getSong() {
    $.ajax({
        url: "/metadata",
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            src = result['url'];
            name = result['name'];
            artist = result['artist'];
            album = result['album'];
            cover = result['cover'];
            next = result['next'];

            if (!sound || sound._src != src) {
                sound = new Howl({
                    src: [src]
                })
            }

            nextSound = new Howl({
                src: [next]
            })

            sound.on("load", function () {
                document.getElementById("loading").style.display = "none";
            });

            playSong();
        }
    });
}

function playSong() {
    $.ajax({
        url: "/time",
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            time = result['time'];

            document.getElementById("song-title").innerHTML = name;
            document.getElementById("song-artist").innerHTML = artist;
            document.getElementById("song-album").innerHTML = album;
            document.getElementById("album-cover").src = cover;
            
            if(start){
                // console.log(sound);
                // console.log(nextSound);
                sound.seek(time);
                sound.play();
                sound.on("end", nextSong);
            }
        }
    });
}

function nextSong() {
    sound.unload();
    sound = nextSound;
    getSong();
}
