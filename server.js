var express = require("express");
const db = require('./database');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/metadata", db.getMetadata);

app.get("/time", db.getTime);

app.listen(process.env.PORT, () => {
    console.log("Server running on port 80");
});