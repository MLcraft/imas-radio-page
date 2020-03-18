var Client = require('pg-native')
var rand = require('./random');

var client = new Client({
    ssl: true,
});

client.connectSync('postgres://wsnqqrlcgfmlis:2a874ffe938a680aa2f6c25d5acdac095ab8caafca16442ee6e7c93ac01f6f43@ec2-50-17-178-87.compute-1.amazonaws.com:5432/d7d6plkt7pbqc1');

const getCurrent = () => {
    var total = 0;
    total = parseInt(client.querySync("SELECT COUNT(*) FROM songs")[0]['count']);
    var randID = rand.getRandomIntInclusive(1, total);
      
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