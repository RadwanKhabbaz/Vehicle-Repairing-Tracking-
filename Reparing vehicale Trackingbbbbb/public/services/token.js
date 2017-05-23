var app = angular.module("tokenModule", []);

app.service("tokenService", function() {
  this.setToken = function(token) {
    localStorage.token = token;
  };

  this.getToken = function() {
    return localStorage.token;
  }

  this.removeToken = function() {
    localStorage.removeItem("token");
  };
})
