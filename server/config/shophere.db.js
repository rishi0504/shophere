var conf = require('./shophere.config');
var MongoClient = require('mongodb').MongoClient

var state = {
  db: undefined,
}

exports.connect = function(url, done) {
  if (state.db!==undefined)
  { 
      return;
  }else{
    MongoClient.connect(conf.db, function(err, db) {
    if (err) return ;
    console.log("DBConnection stablished");
    db.createCollection("users");
    db.createCollection("products");
    state.db = db;

  })
  }
}

exports.get = function() {
  console.log("Returning the connection.");
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      return;
    })
  }
}