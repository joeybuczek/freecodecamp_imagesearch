// module vars
var mongo = require('mongodb').MongoClient;
var express = require('express');
// routes vars
var routes = require('./routes');
// env vars - import local if not on production
if (!process.env.MONGO_URL) { 
    require('./env'); 
 }


// server creation
var app = express();


// routes assignment
app.use('/', routes);


// LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Now listening on port " + port);
});
