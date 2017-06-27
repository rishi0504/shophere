/*var jwt = require('jsonwebtoken');
var conf = require('./shophere.config');

var isUserAuthenticated = function(token){
	console.log("token is "+token);
	jwt.verify(token,conf.secret,function(err,decoded){
		var status = false;
		if(!err){
			status= true;
		}
		return status;
	});
}

module.exports = {
	authenticateUser:isUserAuthenticated
}*/