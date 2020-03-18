var express = require("express");

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/current", (req, res, next) => {
    res.json({"url": "https://a.tumblr.com/tumblr_peyjdq2K291w8huxoo1.mp3", "timestamp": 120});
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});