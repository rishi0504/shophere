var home = angular.module('home');
home.service('homeServices', function($http,$q,$rootScope) {
    this.getProduct = function (url) {
        	var allProduct = undefined;
        	var deferred = $q.defer();
        	$http.get(url).then(function(result) {
				allProduct = result.data;        		
				deferred.resolve(allProduct);
        	},function(error){
        		deferred.reject(error);
        	});
        	allProduct = deferred.promise;
        	return $q.when(allProduct);
    }
    /*this.event = function(eventname,data){
        $rootScope.$emit('eventname', data)
    }*/
});

home.controller('homeController',function($scope,homeServices,$location,$cookies){
    var url = "http://localhost:3000";
	$scope.products = undefined;
	$scope.getProducts = function(){
		 homeServices.getProduct(url+'/getProducts').then(
		 	function(allproducts){
		 	$scope.products = allproducts;
		 });

	}
	
   $scope.showProduct = function(index,productId){
        homeServices.getProduct(url+'/getProduct/'+productId).then(
            function(product){
            $scope.singleProduct = product;
         });
    }
    
    $scope.enlargeImage = function(productImage){
        /*alert(productImage);*/
        var element =angular.element('#product_id');
        element.attr('src',productImage);
    }

    $scope.addToCart = function(product_id,productName,image){

                var product = {};
                product.productId = product_id;
                product.name = productName;
                product.image = image;
            if(window.localStorage['wishList']===undefined){
                var productList = [];
                productList.push(product);
                window.localStorage['wishList'] = JSON.stringify(productList);
            }else{
                var productList = angular.fromJson(window.localStorage['wishList']);
                productList.push(product);
                window.localStorage['wishList'] = JSON.stringify(productList);
            }
    }


    $scope.getProducts();
});