var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var EMRECORDS_COLLECTION = "emrecords";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// emrecords API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/emrecords"
 *    GET: finds all emrecords
 *    POST: creates a new emr
 */

app.get("/api/emrecords", function(req, res) {
  db.collection(EMRECORDS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get emrecords.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/emrecords", function(req, res) {
  var newemr = req.body;
  newemr.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(EMRECORDS_COLLECTION).insertOne(newemr, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new emr.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/emrecords/:id"
 *    GET: find emr by id
 *    PUT: update emr by id
 *    DELETE: deletes emr by id
 */

app.get("/api/emrecords/:id", function(req, res) {
  db.collection(EMRECORDS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get emr");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/emrecords/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(EMRECORDS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update emr");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/emrecords/:id", function(req, res) {
  db.collection(EMRECORDS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete emr");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
