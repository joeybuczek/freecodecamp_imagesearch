var express = require('express');
var router = express.Router();

// home page
router.get('/', function (req, res) {
    res.send(htmlHome);
});

// 2-17-16 need incoming search route
router.get(/^\/api\/imagesearch+/i, function (req, res) {
    
    var searchFor = req.param('searchfor');
    var page = req.param('offset');
    res.send("You're searching for: " + searchFor + " with this many pages: " + page);
    
});

// 2-17-16 incoming latest search route
router.get(/^\/api\/latest\/imagesearch+/i, function (req, res) {
    
    res.send("Here are your latest searches...");
    
});


// html templates
var htmlHome = "<h2>Image Search Tool</h2>";

// export
module.exports = router;