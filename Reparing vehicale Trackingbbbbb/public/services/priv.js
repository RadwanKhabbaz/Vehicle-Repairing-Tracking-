var app = angular.module("privModule", []);

app.service("privService", function() {
  this.setPriv = function(priv) {
    localStorage["priv"] = priv;
  };
  this.getPriv = function() {
    return localStorage["priv"];
  };
  this.removePriv = function() {
    localStorage.removeItem("priv");
  };
});
