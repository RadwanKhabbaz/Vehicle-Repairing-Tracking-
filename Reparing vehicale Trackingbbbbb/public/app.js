var app = angular.module("app", ["ngRoute", "app.home", "app.signup", "app.signin", "app.search", "tokenModule", "app.about", "authModule", "sub"]);

app.config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        redirectTo: "/home"
    }).otherwise({
        redirectTo: "/home"
    });
});

app.service("AuthInterceptor", function ($q, $location, tokenService) {
    this.request = function (config) {
        var token = tokenService.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };

    this.responseError = function (response) {
        if (response.status == 401) {
            tokenService.removeToken();
            $location.path("/signin");
        }
        return $q.reject(response);
    };
});
app.service('Map', function ($q) {

    this.init = function () {
        var options = {
            center: new google.maps.LatLng(33.8937913, 35.50177669999994),
            zoom: 13,
            disableDefaultUI: true
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }

    this.search = function (str) {
        var d = $q.defer();
        this.places.textSearch({
            query: str
        }, function (results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            } else d.reject(status);
        });
        return d.promise;
    }

    this.addMarker = function (res) {
        if (this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }

});


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
});

// $scope.check = false ;
app.controller("appctrl", function ($scope, authSerivce, subServe, Map, tokenService, $location) {

    $scope.check = function () {
        return authSerivce.isAuth();
    }
    $scope.logout = function() {
        tokenService.removeToken();
        $location.path("/home")
    }
    console.log($scope.check())

    $scope.sub = function () {
        var obj = {
            Emaile: $scope.emaile
        };
        subServe.post(obj).then(function (response) {
            console.log(response.status);
        }, function (response) {
            console.log(response.status);
        });
    }

    $scope.place = {};

    $scope.search = function () {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
            .then(
                function (res) { // success
                    Map.addMarker(res);
                    $scope.place.name = res.name;
                    $scope.place.desc = res.desc;
                    $scope.place.phone = res.phone;
                    $scope.place.lat = res.geometry.location.lat();
                    $scope.place.lng = res.geometry.location.lng();

                },
                function (status) { // error
                    $scope.apiError = true;
                    $scope.apiStatus = status;
                }
            );
    }

    $scope.send = function () {
        alert($scope.place.name + '\n' + $scope.place.desc + '\n' + "You Phon Number is " + " : " + $scope.place.phone + '\n' + $scope.place.lat + ', ' + $scope.place.lng + '\n' + "Please wait to call you");
    }

    Map.init();
});
