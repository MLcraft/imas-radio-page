var playedSongs = [];

function getRandomIntInclusive(min, max) {
    var i = Math.floor(Math.random() * (max - min + 1)) + min;

    while (playedSongs.length > max / 2) {
        playedSongs.shift();
    }
    while (playedSongs.includes(i)) {
        i = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    playedSongs.push(i);
    return i
}

module.exports = {
    getRandomIntInclusive,
}
