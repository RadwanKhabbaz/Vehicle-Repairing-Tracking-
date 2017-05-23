var app = angular.module("app.signup", ["ngRoute", "authModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/signup", {
    templateUrl: "signup/signup.tpl.html",
    controller: "signupCtrl"
  });
});


app.controller("signupCtrl", function($scope, authSerivce, $location) {
  $scope.userinput = {};
  $scope.signup = function() {
    var data = {
      firstName:$scope.userinput.firstName,
      lastName:$scope.userinput.lastName, 
      username: $scope.userinput.username,
      email:$scope.userinput.email,
      password: $scope.userinput.password1,
      privilage: $scope.userinput.privilage
      
    }
    authSerivce.signup(data).then(function(response) {
      console.log(response.data);
      $location.path("/signin");
      $scope.userinput = {};
    }, function(response) {
      console.log(response.status);
    })
  };
  $scope.validate = function() {
    var val=true;
    if($scope.userinput.username) {
       val= val & false;
    } else if($scope.userinput.password1) {
      val= val & false;
    } else if($scope.userinput.password2) {
      val= val & false;
    } else if($scope.userinput.password1 != $scope.userinput.password2) {
      val= val & false;
    } else {
      val= val & true;
    }
    return val;
  }
});
