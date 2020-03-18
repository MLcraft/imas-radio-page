var playedSongs = [];
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    i = 0

    while (playedSongs.length > max / 2) {
        playedSongs.shift()
    }
    while (playedSongs.includes(i) | i == 0) {
        i = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return i
    playedSongs.push();
}

module.exports = {
    getRandomIntInclusive,
}
