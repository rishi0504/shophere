var header = angular.module('header');

header.controller('headerController',function($scope,$rootScope,homeServices){
	var url = "http://localhost:3000";

	$scope.showWishList = function(){
		$scope.wishLists = angular.fromJson(window.localStorage.wishList);
		console.log(JSON.stringify($scope.wishLists));
	}

	 $scope.clearWishList = function(){
        delete window.localStorage.wishList;
    }
    $scope.getProductDetails = function(productId){
    	
    		
    	

    	/*window.localStorage.currentProduct*/
    	
    	/*$rootScope.$broadcast('changedVariable', productId);*/
    	
   	 }
});