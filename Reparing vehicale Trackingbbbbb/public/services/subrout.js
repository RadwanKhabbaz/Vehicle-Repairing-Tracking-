/**
 * Created by User on 5/5/2017.
 */
var app = angular.module("sub", []);


app.service("subServe", function($http) {
    this.name="blabla";
    this.get = function() {
        return $http.get("http://localhost:8080/contact");
    };
    this.post = function(data) {
        console.log("inside service ",data);
        return $http.post("http://localhost:8080/contact",data);
    };
//{Emaile:"vehiclerepairtracking@gmail.com"}

});
