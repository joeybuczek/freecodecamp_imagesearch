var express = require('express');
var router = express.Router();
var mongoFn = require('./mongoFn');

// home page
router.get('/', function (req, res) {
    res.send(htmlHome);
});

// 2-19-16 need incoming search route - imgur api?
router.get(/^\/api\/imagesearch+/i, function (req, res) {
    
    var searchFor = req.param('searchfor');
    var page = req.param('offset');
    res.send("You're searching for: " + searchFor + " with this many pages: " + page);
    
    // perform db cleanup
    // mongoFn.databaseCleanup();
    
});

// incoming latest search route
router.get(/^\/api\/latest\/imagesearch+/i, function (req, res) {
    
    mongoFn.latestSearch(function(results){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(results, null, 4));
    });
    
    // perform db cleanup
    mongoFn.databaseCleanup();
    
});

// 2-19-16 testing mongo insert - this will eventually be functionality for new image search
router.get(/^\/test+/i, function(req, res){
    mongoFn.insertSearch("iceland test", function(result){
        res.send('The result of the insert is: ' + result);
    });
});


// html templates
var htmlHome = "<h2>Image Search Tool</h2>" +
               "<p>This service will allow you to search for images, and will return (in JSON format) the URLs, " + 
               "Alt Text, and Page URLS for each image found.</p>" +
               "<p>To perform a new search, append the following criteria to the <span style='color:royalblue;'>/api/imagesearch</span> path:</p>" +
               "<pre style='color:royalblue;'>searchfor=&lt;yourSearchCriteria&gt;</pre>" +
               "<pre style='color:royalblue;'>offset=&lt;pageNumberOfResults&gt;</pre>" +
               "<b>Example Searches:</b>" +
               "<pre style='color:royalblue;'>/api/imagesearch?searchfor=iceland&offset=1</pre>" + 
               "<pre style='color:royalblue;'>/api/imagesearch?searchfor=reykjavik&offset=5</pre>" +
               "<p>To see the latest image searches, use the following path: <span style='color:royalblue;'>/api/latest/imagesearch</span>. " + 
               "The response will be a JSON object.</p>";

// export
module.exports = router;