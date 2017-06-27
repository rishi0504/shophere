var product = angular.module('product');
product.controller('productDetailController', function($scope, homeServices, $rootScope, $routeParams) {
    var url = "http://localhost:3000";

    $scope.getProduct = function() {
        homeServices.getProduct(url + '/getProduct/' + $routeParams.productId).then(
            function(product) {
                $scope.singleProduct = product;
            });
    }
    $scope.enlargeImage = function(productImage) {
            /*alert(productImage);*/
            var element = angular.element('#product_id');
            element.attr('src', productImage);
        }
        /*$scope.test = function(){
            alert($routeParams.productId);
        }*/
        /*function productDetails(productId){
            alert(productId);
        }

        productDetails($routeParams.productId);*/



    /*$rootScope.$on('changedVariable', function (event, args){
        alert(args);
        $scope.productDetails = args;
    });*/
});

product.controller('addProduct', function($scope,$http,$location) {
    var allImageFiles;
    $scope.newImageUploaded = function(element) {
        $scope.files = element.files;
        allImageFiles = $scope.files;
        $scope.$apply();
        console.log(element.files);
    }
    $scope.addProduct = function() {
        var product = {};
        var formData = new FormData();
        angular.forEach($scope.files, function(file) {
            formData.append('file', file);
        });

        var productDetails = [];
        productDetails.push($scope.productDetail1);
        productDetails.push($scope.productDetail2);
        productDetails.push($scope.productDetail3);

        product.productDetails=productDetails;
        product.category=$scope.category;
        product.availableSize=$scope.availableSize;
        product.offer=$scope.offer;
        product.prize=$scope.prize;
        product.customerId=$scope.customerId;
        product.productName=$scope.productName;
        
        formData.append('product',angular.toJson(product));
        
        $http.post('http://localhost:3000/addProduct', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined }
        }).then(function(successResponse){
            if(successResponse.status==200){
                $location.path('/');
            }
        });
    }


});
