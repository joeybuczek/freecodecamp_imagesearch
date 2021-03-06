// handles all routing

// module vars
var express = require('express');
var router = express.Router();
var mongoFn = require('./mongoFn');
var Search = require('bing.search');

// env vars
if (!process.env.API_KEY) { require('./env'); }

// bing image search api vars
var imageSearch = new Search(process.env.API_KEY);

// home page
router.get('/', function (req, res) {
    res.send(htmlHome);
});

// incoming search route - bing api
router.get(/^\/api\/imagesearch+/i, function (req, res) {
    
    var searchFor = req.param('searchfor');
    var page = req.param('offset') || 1;
    
    imageSearch.images(searchFor, { 'skip' : page - 1 }, function (err, results) {
        // store and format only 10 of the results
        var displayArray = [];
        for (var i = 0; i < 10; i++) {
            displayArray.push( { 'title':results[i].title, 'url':results[i].url, 'sourceUrl':results[i].sourceUrl } );
        }
        // display json formatted results
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(displayArray, null, 4));
    });
    
    // record search and cleanup db afterwards
    mongoFn.insertSearch(searchFor, function(result) {
        if (result) mongoFn.databaseCleanup();
    });
    
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

// html templates
var htmlHome = "<h2>Image Search Tool</h2>" +
               "<p>This service will allow you to search for images, and will return (in JSON format) the URLs, " + 
               "Alt Text, and Page URLS for each image found.</p>" +
               "<p>To perform a new search, append the following criteria to the <span style='color:royalblue;'>/api/imagesearch</span> path:</p>" +
               "<pre style='color:royalblue;'>searchfor=&lt;yourSearchCriteria&gt;</pre>" +
               "<pre style='color:royalblue;'>offset=&lt;pageNumberOfResults&gt;</pre>" +
               "<b>Example Searches:</b>" +
               "<pre style='color:royalblue;'>https://fcc-imagesearchtool.herokuapp.com/api/imagesearch?searchfor=iceland&offset=1</pre>" + 
               "<pre style='color:royalblue;'>https://fcc-imagesearchtool.herokuapp.com/api/imagesearch?searchfor=reykjavik&offset=5</pre>" +
               "<p>To see the latest image searches, use the following path: <span style='color:royalblue;'>/api/latest/imagesearch</span>. " + 
               "The response will be a JSON object.</p>";

// export
module.exports = router;