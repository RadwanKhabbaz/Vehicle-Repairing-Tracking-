var app = angular.module("authModule", ["tokenModule"]);

app.service("authSerivce", function($http, tokenService) {
  this.signup = function(data) {
    return $http.post("http://localhost:8080/auth/signup", data);
  }
  this.signin = function(data) {
    return $http.post("http://localhost:8080/auth/signin", data);
  }
  this.isAuth=function(){
      return !!tokenService.getToken();
  }
});

