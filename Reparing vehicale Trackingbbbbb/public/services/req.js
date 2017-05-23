var app = angular.module("reqModule", []);

app.service("requests", function($http) {
  this.get = function() {
    return $http.get("http://localhost:8080/api");
  };
  this.post = function(data) {
    return $http.post("http://localhost:8080/api", data);
  };
    
  this.postByID = function(id, data) {
    return $http.post("http://localhost:8080/api/"+ id, data);
  };  
  this.put = function(id, data) {
    var queryString = "?";
    for(key in data) {
      queryString += key + "=" + data[key] + "&";
    }
    return $http.put("http://localhost:8080/api/" + id + queryString);
  };
//    this.put = function(id, data){
//        return $http.put("http://localhost:8080/api/" + id, data);
//    }
  this.delete = function(id) {
    return $http.delete("http://localhost:8080/api/" + id);
  };
});
