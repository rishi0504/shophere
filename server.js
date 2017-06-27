var express = require('express');
var mongoose =  require('mongoose');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var morgan = require('morgan');
var conf = require('./server/config/shophere.config');
var bodyParser = require('body-parser');
var logger = require('express-logger');
var app = express();
var multer=require('multer');
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/client',  express.static(__dirname + '/client'));
app.use('/server',  express.static(__dirname + '/server'));
app.use('/views',  express.static(__dirname + '/client/views'));
/*app.use(express.static(__dirname + '/client'));*/
/*app.use('/client', express.static(__dirname + 'client/'));*/

app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({extended: true,limit: '15mb'}));
/*app.use(multer({ dest: 'products/'}).single('userPhoto'));*/


var db = require('./server/config/shophere.db');
db.connect();

app.get('/',function(req,res){
	res.sendFile(__dirname+'/client/index.html');
});
require('./server/modules/products/product.route')(app,express);
/*
require('./server/routes/user/signup.route')(app,express);
require('./server/routes/user/signin.route')(app,express);*/
app.listen(conf.port,function(){
	console.log("Server started at port "+conf.port);
});  



