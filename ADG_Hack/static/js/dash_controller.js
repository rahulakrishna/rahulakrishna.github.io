var adgDashAppControllers=angular.module('adgDashAppControllers',[]);

adgDashAppControllers.controller('profileCtrl',['$scope','$routeParams','$http',function ($scope,$routeParams,$http) {
    $http.get('data/'+$routeParams.userId+'.json').success(function (data) {
       $scope.profile=data;
    });
}]);