var Client = require('pg-native')
var rand = require('./random');

var client = new Client({
});

const port = process.env.PORT;
const user = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const server = process.env.PGSERVER;

client.connectSync(`postgres://${user}:${password}@${server}:${port}`);

const getCurrent = () => {
    var total = 0;
    total = parseInt(client.querySync("SELECT COUNT(*) FROM songs")[0]['count']);
    var randID = rand.getRandomIntInclusive(1, total);

    // console.log(randID);
    var songs = client.querySync("SELECT * FROM songs WHERE id=" + randID.toString());
    return songs[0];
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