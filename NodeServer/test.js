var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";
var database;
var dberror = 'dberror';

MongoClient.connect(url, function(err, db) {	
	if (err){ throw err;}
	database = db.db("mongoDB");
	dberror='connect';
	//createCounterCollection(database);
	
	var sequenceDoc = database.collection('counter').findAndModify(
	   { "_id": 'user_id' },[],[
	   { "$inc": { new:1 } }],{},
	   function(err,doc) {
		console.log(err,"   modified   ",doc);
		console.log( doc);
	   }
	);
//database.close();
	
	
	
	
	
	
});