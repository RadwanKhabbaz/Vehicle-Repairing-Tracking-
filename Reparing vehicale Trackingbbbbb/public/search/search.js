var app = angular.module("app.search", ["ngRoute"]);
app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});
app.config(function($routeProvider) {
  $routeProvider.when("/search", {
    templateUrl: "search/search.html",
    controller: "searchCtrl"
  });
});
  app.controller("searchCtrl", function($scope, $http) {

    $scope.imgIndex = 0;
    $scope.imagesFound = 0;
    $scope.imageRequest = '';
    $scope.ImageSearch = function() {
        //build the url request
      $scope.imgUrl = 'https://pixabay.com/api/?key=4520761-ea426cf1212ecdb1f5e6856e9&q=' + $scope.imageRequest + '&image_type=photo+per_page=200';
    console.log($scope.imgUrl);
      $http({
        method: 'GET',
        url: $scope.imgUrl
      }).then(function successCallback(response) {
        $scope.currentPage = 0;
        $scope.paginationShow = true;
        $scope.imagesFound = response.data.total;
        $scope.itemsCount = response.data.hits;
        $scope.imgUrlPush = response.data.hits;
          console.log($scope.imgUrlPush);
        $scope.NewImg();
      }, function errorCallback(response) {
        $scope.status = 'Error, try again!';
      });
    };
    $scope.NewImg = function() {
      $scope.imgArr = [];
      var i = 0;
      for (i = 0; i < $scope.imagesFound; i++) {
        $scope.imgIndex = i;
        $scope.imgArr.push($scope.imgUrlPush[i].webformatURL)
      }
      console.log($scope.imgArr)
    }

    $scope.currentPage = 0;
    $scope.itemsPerPage = 3;

    $scope.firstPage = function() {
      return $scope.currentPage == 0;
    }
    $scope.lastPage = function() {
      var lastPageNum = Math.ceil($scope.imagesFound / $scope.itemsPerPage - 1);
      return $scope.currentPage == lastPageNum;
    }
    $scope.numberOfPages = function() {
      return Math.ceil($scope.imagesFound / $scope.itemsPerPage);
    }
    $scope.startingItem = function() {
      return $scope.currentPage * $scope.itemsPerPage;
    }
    $scope.pageBack = function() {
      $scope.currentPage = $scope.currentPage - 1;
    }
    $scope.pageForward = function() {
      $scope.currentPage = $scope.currentPage + 1;
    }
  })