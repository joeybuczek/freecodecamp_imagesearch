// module vars
var express = require('express');
var mongoFn = require('./mongoFn');
// routes vars
var routes = require('./routes');


// server creation
var app = express();


// routes assignment
app.use('/', routes);


// LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Now listening on port " + port);
});
