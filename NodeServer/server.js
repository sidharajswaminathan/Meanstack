var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";
var database;
var dberror = 'dberror',db;

MongoClient.connect(url, function(err, db) {
	if (err){ throw err;}
	database = db.db("mongoDB");
	dberror='connect';
	db = db;
	//createCounterCollection(database);
});

function createCounterCollection(currentdb){
	currentdb.createCollection("counter",function(err,resp){});
	currentdb.collection('counter').insertOne({_id: "user_id", sequence_value: 0},function(err,resp){});
}
function createDynamicID(currentdb,sequenceOfName){
	var datamodifyPromise = new Promise(function(resolve, reject){
		var sequenceDoc = currentdb.collection('counter').findAndModify(
		{'_id':sequenceOfName},[],{ "$inc": { "sequence_value": 1 } },{},
			function(err,resp){
				if(err){
					console.log(err.message);
					reject(err.message);
				} else{
					console.log(resp,"  resolve");
					resolve(resp.value.sequence_value);
				}
			}
		);
	});
	return datamodifyPromise;
}

var listenserver= express();
listenserver.use(bodyParser.json());
listenserver.use(bodyParser.urlencoded({ extended: true }));

listenserver.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*Method to remove collection from DB*/
function removeCollection(){
	database.collection.remove({});
}

listenserver.post('/signup',function(req,res){
	var servicemessage='failure';	
	var clientReq = req,clientRes = res;
	createDynamicID(database,"user_id").then(function(response){
		var mydata = {
			'_id':response,
			'userName':clientReq.body.userName,
			'firstName':clientReq.body.firstName,
			'lastName': clientReq.body.lastName,
			'password': clientReq.body.password,
			'email':clientReq.body.email,
			'phone':clientReq.body.phonenumber
		}
		if(dberror=='connect'){
			database.collection('usermanagement').insertOne(mydata,function(err,resp){
				if(err){console.log(err.message);return;
				}else{
					servicemessage='success';
				}		
				var jsondata={
					'message':servicemessage,
					'data':'',
					'sessioned':true
				}	
				res.end(JSON.stringify(jsondata));
			});
		}
	},function(error){
			console.log("  reject  ", error);
	});	
});

/* Method to authenticate the user (Login) */
listenserver.post('/login',function(loginreq,loginresp){
	console.log(loginreq.body,' database    ');
	var servicemessage='failure';
	var loginResponse = {
		'message': '',
		'data': null,
		'sessioned': false
	}
	database.collection("usermanagement").find({'userName':loginreq.body.userName}).toArray(function(err, result) {
		if(err){
			servicemessage = "Oops something went wrong!. Please try again.";
			console.log(err.message);return;
		}else{
			console.log(loginreq.body.password,"   result is   ", result);
			if(result.length){
				if(loginreq.body.password === result[0].password){
					loginResponse.data = result[0];
					servicemessage = 'Welcome ' + result[0].userName + '  You have successfully logged in!';
				} else {
					loginResponse.data = null;
					servicemessage = 'Password is incorrect. Please try again!';
				}
			} else {
				loginResponse.data = null;
				servicemessage = "User doesn't exist! Please try again.";
			}	
		}
		loginResponse.message = servicemessage;
		loginResponse.sessioned = true;
		loginresp.end(JSON.stringify(loginResponse));
		//db.close();
	});
});
var server = listenserver.listen(8082, function () {
    console.log("server listening" );
})






