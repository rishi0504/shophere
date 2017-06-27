var database = require('../../config/shophere.db');
var fs = require('fs');
var mongodb = require('mongodb');
module.exports.addProduct = function(req,res){
	var db = database.get().collection('products');
	console.log(req.body.product);
	console.log(req.files);
	var product={};
	console.log("productdetails")
	var requestProduct = JSON.parse(req.body.product);
	console.log(requestProduct.productDetails);

	product.description=requestProduct.productDetails;
	product.availableSize = requestProduct.availableSize;
	product.prize = requestProduct.prize;
	product.offer = requestProduct.offer;
	product.productName = requestProduct.productName;
	product.customerId = requestProduct.customerId;
	product.category = requestProduct.category;
	var productImages = "";
	var allFiles=[];
	var allOriginalNames=[];
	
	for(var i=0;i<req.files.length;i++){
		productImages=productImages+req.files[i].originalname.trim()+" ";
		allFiles.push(req.files[i].path);
		allOriginalNames.push(req.files[i].originalname.trim());
	}
	product.images = productImages;
	db.insert(product, function(err, result) {
			if(err){
				res.json({"Message":"Product not added to database"});
			}else{
				var productFoldername = 'server/products/'+result.ops[0]._id+"/";
				if (!fs.existsSync(productFoldername)) {
					fs.mkdirSync(productFoldername,'0755');
					for(var i=0;i<allFiles.length;i++){
						fs.rename(allFiles[i],productFoldername+'/'+allOriginalNames[i],function(err){
							if(err)
								throw err;
						});	
					}
				}
				res.json({"req":req.files,"result":result});
			}
	});
	

	/*var product = {};
	var description=[];

	description[0]= req.body.Style;
	description[1] = req.body.Perfect_For;
	description[2] = req.body.Material;
	description[3] = req.body.extraDetail;
	description[4] = req.body.Disclaimer;

	product.description = description;
	product.availableSize = req.body.availableSize;
	product.prize = req.body.prize;
	product.offer = req.body.offer;
	product.productName = req.body.productName;
	product.provider = req.body.providerName;
	var productImages = "";
	var allFiles=[];
	var allOriginalNames=[];
	for(var i=0;i<req.files.length;i++){
		productImages=productImages+req.files[i].originalname.trim()+" ";
		allFiles.push(req.files[i].path);
		allOriginalNames.push(req.files[i].originalname.trim());
	}
	product.images = productImages;
	db.insert(product, function(err, result) {
			if(err){
				res.json({"Message":"Product not added to database"});
			}else{
				var productFoldername = 'server/products/'+result.ops[0]._id+"/";
				if (!fs.existsSync(productFoldername)) {
					fs.mkdirSync(productFoldername,'0755');
					for(var i=0;i<allFiles.length;i++){
						fs.rename(allFiles[i],productFoldername+'/'+allOriginalNames[i],function(err){
							if(err)
								throw err;
						});	
					}
				}
				res.json({"req":req.files,"result":result});
			}
	});*/
}

module.exports.getProducts = function(req,res){
	var db = database.get().collection('products');
	db.find({}).toArray(function(err, response) {
    	if(err){
    		return err;
    	}else{
    		
    		var responseData = undefined;
    		response.forEach(function(data){
    			var allImages = [];
    			var allSizes = [];
    			var images = data.images.split(' ');
    			var availableSizes = data.availableSize.split(',');
    			for(var i=0;i<availableSizes.length;i++){
    				if(availableSizes[i]!=" "){
    					allSizes[i]=availableSizes[i];
    				}
    			}
    			for(var i=0;i<images.length;i++){
    				if(images[i]!=" "){
    					allImages[i]="../../server/products/"+data._id+"/"+images[i];
    				}
    			}
    			data.allImages = allImages;
    			data.allSize = allSizes;
    			data.mainImage = allImages[0];
    		});
    		res.json(response);
    	}
  });
}

module.exports.getProduct = function(req,res){
	var db = database.get().collection('products');
	var actualObjectId =  require('mongodb').ObjectID(req.params.productId);
	db.findOne({_id:actualObjectId},function(err,data){
		if(err){
			res.json(err);
		}else{
				var allImages = [];
    			var allSizes = [];
    			var images = data.images.split(' ');
    			var availableSizes = data.availableSize.split(',');
    			for(var i=0;i<availableSizes.length;i++){
    				if(availableSizes[i]!=" "){
    					allSizes[i]=availableSizes[i];
    				}
    			}
    			for(var i=0;i<images.length;i++){
    				if(images[i]){
    					allImages[i]="../../server/products/"+data._id+"/"+images[i];
    				}
    			}
    			data.allImages = allImages;
    			data.allSize = allSizes;
    			data.mainImage = allImages[0];
			res.json(data);
		}
	});
}