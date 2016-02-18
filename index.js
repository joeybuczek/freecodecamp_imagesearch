// module vars
var express = require('express');
var mongoFn = require('./mongoFn');
// routes vars
var routes = require('./routes');


// server creation
var app = express();


// routes assignment
app.use('/', routes);

// handle all 404 errors
app.use(function(req, res){
    res.send("404 - Sorry, we were unable to locate what you were looking for.");
});

// listen
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Now listening on port " + port);
});
