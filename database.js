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
var current = null;
var time = 0;

current = getCurrent();

const getUrl = (request, response) => {
    response.status(200).json({'url': current['url']});
}

const getTime = (request, response) => {
    response.status(200).send({'time': time});
}

module.exports = {
    getUrl,
    getTime
}