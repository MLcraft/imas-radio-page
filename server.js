var express = require("express");
const db = require('./database');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname + '/public'));

app.get("/metadata", db.getMetadata);

app.get("/time", db.getTime);

app.get("/", function(req, res) {
    res.sendFile( path.join(__dirname, 'public', 'index.html'));
})

app.listen(3000, () => {
    console.log("Server running on port");
});