var express = require('express');
var router = express.Router();

// home page
router.get('/', function (req, res) {
    res.send(htmlHome);
});


// html templates
var htmlHome = "<h2>Image Search Tool</h2>";

// export
module.exports = router;