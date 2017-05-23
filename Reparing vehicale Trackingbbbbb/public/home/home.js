var app = angular.module("app.home", ["ngRoute","reqModule"]);
app.config(function($routeProvider){
    $routeProvider.when("/home", {
        templateUrl:"./home/home.html",
        controller:"myCtrl"
    })
 
});
app.controller("myCtrl",function($scope){
});