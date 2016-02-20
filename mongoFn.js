// module
var mongo = require('mongodb').MongoClient;

// env vars - import local if not on production
if (!process.env.MONGO_URL) { require('./env'); }
var mongoUrl = process.env.MONGO_URL;
 
 // exports var
 var mongoFn = {};
 
 // inserts a search string and date into the db - accepts string & callback, returns boolean
 mongoFn.insertSearch = function (searchFor, callback) {
     mongo.connect(mongoUrl, function (err, db) {
         
         // handle err
         if (err) callback(false);
         
         // normal
         var searchdata = db.collection('searchdata');
         var date = new Date();
         var insertObj = { searchFor: searchFor, searchDate: date };
         
         searchdata.insert(insertObj, function(err, data){
             if (err) {
                 db.close();
                 callback(false);
             } else {
                 db.close();
                 callback(true);
             }
         });
     });
 };
 
 // retrieves up to the last 10 db records - accepts callback, returns array of objects
 mongoFn.latestSearch = function (callback) {
   mongo.connect(mongoUrl, function (err, db) {
       
       // handle err
       if (err) callback([{'results': 'error at connection'}]);
       
       // normal
       var searchdata = db.collection('searchdata');
       var sort = { $sort: { 'searchDate': -1 } };
       var limit = { '$limit': 10 };
       var projection = { '$project': {'_id': 0, 'searchFor': 1, 'searchDate': 1} };
       
       searchdata.aggregate([sort, limit, projection]).toArray(function (err, docs) {
           if (err) {
               db.close();
               callback([{'results':err}]);
           } else {
               db.close();
               callback(docs);               
           }
       });   
   });  
 };
 
 // database cleanup - only allow 10 items in the database
 mongoFn.databaseCleanup = function () {
     mongo.connect(mongoUrl, function (err, db) {
         
         // handle err
         if (err) console.log("Unable to connect to database for cleanup.");
         
         // normal - sort by date descending before retrieval
         var searchdata = db.collection('searchdata');
         var sort = { '$sort' : { 'searchDate': -1 } };
         var project = { '$project': { 'searchDate': 1, 'searchFor': 1 } };
         
         searchdata.aggregate([sort, project]).toArray(function (err, docs) {
             // handle err
            if (err) {
                console.log("Unable to retrieve database collection");
                db.close();
            }
            // normal
            if (docs.length <= 10) {
                // Database records at 10 or less.
                db.close();
            } else {
                // remove docs with dates earlier than the 10th document object (older searches)
                var removeMatch = { 'searchDate' : { '$lt' : docs[9].searchDate } };
                searchdata.deleteMany(removeMatch, function (err, results) {
                    // handle err
                    if (err) console.log('Unable to remove document(s).');
                    // normal
                    db.close();
                });
            }
         });
     });
 };
 
 // module exports
 module.exports = mongoFn;