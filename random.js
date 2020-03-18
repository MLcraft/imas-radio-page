var playedSongs = []









function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    i = null

    while (playedSongs.length > max/2){
      playedSongs.shift()
    }







    do{
      i = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    while (!playedSongs.includes(i)){
      i = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return i




    playedSongs.push();
}

module.exports = {
  getRandomIntInclusive,
}
