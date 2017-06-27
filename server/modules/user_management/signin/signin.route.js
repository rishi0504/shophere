var signinController = require('../../controllers/signin.controller');

module.exports = function(app,express){
	app.use(function(req, res,next){
		res.header('Access-Control-Allow-Origin','*');
		res.header('Access-Control-Allow-Methods', 'POST');
		res.header('Access-Control-Allow-Headers', 'Content-Type','accept');
		next();
	});	
	console.log("Inside the route");
	app.post('/signin',signinController.login);
}
