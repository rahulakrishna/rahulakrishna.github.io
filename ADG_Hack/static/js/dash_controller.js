var adgDashAppControllers=angular.module('adgDashAppControllers',[]);

adgDashAppControllers.controller('profileCtrl',['$scope','$http',function ($scope,$http) {
    $http.get('data/dashboard.json').success(function (data) {
       $scope.profile=data;
    });
}]);