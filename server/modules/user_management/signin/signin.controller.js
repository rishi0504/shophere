var database = require('../config/shophere.db');
var jwt = require('jsonwebtoken');
var conf = require('../config/shophere.config');
var passwordHash = require('password-hash');

module.exports.login =function(req,res) {
	 var db = database.get().collection('users');
	 var user = {};
	 user.username = req.body.username;
	 db.findOne({username:req.body.username},function(err,result){
	 	if(err){
	 		res.json(err);
	 	}else{
	 		if(passwordHash.verify(req.body.password,result.password)){
	 			res.json(result);	
	 		}else{
	 			res.json({"Message":"Username or the password is incorrect."});
	 		}
	 	}
	 });
} 