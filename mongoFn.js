// module
var mongo = require('mongodb').MongoClient;

// env vars - import local if not on production
if (!process.env.MONGO_URL) { require('./env'); }
var mongoUrl = process.env.MONGO_URL;
 
 // exports var
 var mongoFn = {};
 
 // mongo functions
 mongoFn.connectionTest = function (str) {
    mongo.connect(mongoUrl, function (err, db) {
        
        // handle err
        if (err) throw err;
        
        // normal
        var searchdata = db.collection('searchdata');
        var query = {};
        searchdata.find(query).toArray(function (err, docs) {
            
            console.log('There are ' + docs.length + ' in this collection: ' + str);
            db.close();
            
        });
    });  
 };
 
 // module exports
 module.exports = mongoFn;