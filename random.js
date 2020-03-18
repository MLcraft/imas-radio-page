var playedSongs = [];
function getRandomIntInclusive(min, max) {
    const lmin = Math.ceil(min);
    const lmax = Math.floor(max);
    var i = Math.floor(Math.random() * (lmax - lmin + 1)) + lmin;

    while (playedSongs.length > lmax / 2) {
        playedSongs.shift()
    }
    while (playedSongs.includes(i)) {
        i = Math.floor(Math.random() * (lmax - lmin + 1)) + lmin;
    }
    playedSongs.push();
    return i
}

module.exports = {
    getRandomIntInclusive,
}
