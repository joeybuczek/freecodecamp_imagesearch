// modules
var mongo = require('mongodb').MongoClient;
var express = require('express');


// server
var app = express();


// routes =============================
var htmlHome = "<h2>Image Search</h2>";

app.get('/', function (req, res) {
    res.send(htmlHome);
});





// LISTEN
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Now listening on port " + port);
});
