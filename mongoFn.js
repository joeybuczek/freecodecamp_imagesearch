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
 
 // module exports
 module.exports = mongoFn;