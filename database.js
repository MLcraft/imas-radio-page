// var Client = require('pg-native')
var loader = require('csv-load-sync');
var rand = require('./random');

// var client = new Client({
// });

// client.connectSync('postgres://postgres:Ilovemomoko20@imas-radio-db.clre2ilzrstm.us-west-2.rds.amazonaws.com:5432/api');

const getCurrent = () => {
    songs = loader("songs.csv");
    var total = 0;
    total = songs.length;
    var randID = rand.getRandomIntInclusive(1, total);

    // console.log(randID);
    // console.log(songs[randID]);
    // var songs = client.querySync("SELECT * FROM songs WHERE id=" + randID.toString());
    return songs[randID];
}

function timer() {
  setTimeout(function () {
      time++;
      // console.log(time);
      if (time >= songTotalTime) {
        current = next;
        next = getCurrent();
        songTotalTime = current['length'];
        time = 0;
      }
      timer();
  }, 1000);
}

var current = getCurrent();
var next = getCurrent();
var time = 0;
var songTotalTime = current['length'];
// console.log(songTotalTime);

timer();

const getMetadata = (request, response) => {
    response.status(200).json({'name': current['name'], 'url': current['url'], 'artist': current['artist'], 'album': current['album'], 'cover': current['cover'], 'next': next['url']});
}

const getTime = (request, response) => {
    response.status(200).send({'time': time});
}

module.exports = {
    getMetadata,
    getTime,
}