var app = angular.module('shophere', ['ngRoute', 'home', 'header', 'ngCookies', 'product','ngFileUpload']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./views/sidebar.html"
        }).when("/signin", {
            templateUrl: "./views/signin.html"
        })
        .when("/signup", {
            templateUrl: "./views/signup.html"
        })
        .when("/productDetail/:productId", {
            templateUrl: "./views/productDetail.html"
        }).when("/addProduct", {
            templateUrl: "./views/addProduct.html"
        })
        /*.when("/red", {
            templateUrl : "red.htm"
        })
        .when("/green", {
            templateUrl : "green.htm"
        })
        .when("/blue", {
            templateUrl : "blue.htm"
        });*/
});
