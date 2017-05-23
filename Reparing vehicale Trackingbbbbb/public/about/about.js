var app = angular.module("app.about", ["ngRoute", "privModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/about", {
        templateUrl: "./about/about.html",
        controller: "aboutCtrl"
    })

});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
app.controller("aboutCtrl", function ($scope, requests, privService) {
    $scope.carItems = [];
    $scope.reaadyToAddRepairing = false;
    $scope.userinput = {};
    $scope.priv = privService.getPriv();
    $scope.loadData = function () {
        requests.get().then(function (response) {
            //suc
            $scope.carItems = response.data.data;
            $scope.carItems = $scope.carItems.map(function (car) {
                car.isEdit = false;
                car.reaadyToAddRepairing=false;
                return car;
            });
        }, function (response) {
            //fail
            console.log(response.status);
        });
    };
    $scope.addData = function () {
        requests.post($scope.userinput).then(function (response) {
            $scope.loadData();
            $scope.userinput = {};
        }, function (response) {
            console.log(response.status);
        });
    };

    $scope.insertRepairing = function (car) {
        car.reaadyToAddRepairing = true;
    }
    $scope.addRepairing = function (car, repairing) {

        console.log(repairing);
        requests.postByID(car._id, repairing).then($scope.get);
        $scope.loadData();

    };

    $scope.toggleEdit = function (car) {
        car.isEdit = !car.isEdit;
    };

    $scope.saveData = function (id, data) {
        var carEdited = {
            brand: data.brand,
            status: data.status,
            repairing: data.repairing,
            owner: data.owner,
            username: data.username
        };
        console.log(carEdited);
        requests.put(id, carEdited).then($scope.get);
        $scope.loadData();
    };

    $scope.delete = function (id) {
        requests.delete(id).then(function (response) {
            $scope.loadData();
        }, function (response) {
            console.log(response.status);
        });
    };
    if (getParameterByName("token")) {
        tokenService.setToken(getParameterByName("token"));
        $scope.loadData();
    }
});
