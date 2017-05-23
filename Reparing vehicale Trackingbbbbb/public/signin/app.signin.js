var app = angular.module("app.signin", ["ngRoute", "authModule", "tokenModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/signin", {
    templateUrl: "signin/signin.tpl.html",
    controller: "signinCtrl"
  });
});


app.controller("signinCtrl", function($scope, authSerivce, tokenService, $location) {
  $scope.userinput = {};
  $scope.signin = function() {
      console.log("Hello");
    var data = {
      username: $scope.userinput.username,
      password: $scope.userinput.password
    }
    console.log(data);
    authSerivce.signin(data).then(function(response) {
      tokenService.setToken(response.data.token);
      $location.path("/about");
      $scope.userinput = {};
    }, function(response) {
      console.log(response.status);
        alert("Sorry! username or password is wrong");
        $scope.userinput = {};
    })
  };
});
