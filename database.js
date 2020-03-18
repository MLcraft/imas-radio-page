var Client = require('pg-native')

var client = new Client();

client.connectSync("user=me host=localhost dbname=api password=password port=5432");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCurrent = () => {
    var total = 0;
    total = parseInt(client.querySync("SELECT COUNT(*) FROM songs")[0]['count']);
    var randID = getRandomIntInclusive(1, total);
      
    console.log(randID);
    var songs = client.querySync("SELECT * FROM songs WHERE id=" + randID.toString());
    return songs[0];
}

function timer() {
  setTimeout(function () {
      time++;
      // console.log(time);
      if (time >= songTotalTime) {
        current = getCurrent();
        songTotalTime = current['length'];
        time = 0;
      }
      timer();
  }, 1000);
}

var current = getCurrent();
var time = 0;
var songTotalTime = current['length'];
// console.log(songTotalTime);

timer();

const getMetadata = (request, response) => {
    response.status(200).json({'name': current['name'], 'url': current['url']});
}

const getTime = (request, response) => {
    response.status(200).send({'time': time});
}

module.exports = {
    getMetadata,
    getTime,
}