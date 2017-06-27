var productController = require('./product.controller');
var jwt = require('jsonwebtoken');
var conf = require('../../config/shophere.config');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'server/tmp/'); // set the destination
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + '.jpg'); // set the file name and extension
    }
});
var uploadDirectory = multer({storage: storage});


module.exports = function(app,express){
	app.use(function(req, res,next){
		res.header('Access-Control-Allow-Origin','*');
		res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type','accept');
		/*res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');*/
		/*
			Middleware for the authentication before processing the controller needs to be satisfy
		*/
		/*jwt.verify(req.headers['x-access-token'],conf.secret,function(err,decoded){
			if(err){
				console.log("Sorry can't allow u to go ahead");
			}else{
				console.log("Successfull authentication");
				next();
			}
		});*/
		next();
	});	

	app.post('/addProduct',uploadDirectory.any(),productController.addProduct);
	app.get('/getProducts',productController.getProducts);
	app.get('/getProduct/:productId',productController.getProduct);
}
