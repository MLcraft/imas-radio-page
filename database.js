var Client = require('pg-native')

var client = new Client();
const bufferTime = 3;

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
      if (time >= songTotalTime + bufferTime) {
        current = getCurrent();
        time = 0;
      }
      timer();
  }, 1000);
}

var current = getCurrent();
var time = 0;
var songTotalTime = current['length'];
console.log(songTotalTime);

timer();

const getName = (request, response) => {
  response.status(200).json({'name': current['name']});
}

const getUrl = (request, response) => {
    response.status(200).json({'url': current['url']});
}

const getTime = (request, response) => {
    response.status(200).send({'time': time});
}

module.exports = {
    getUrl,
    getTime,
    getName
}