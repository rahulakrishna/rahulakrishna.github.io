var app=angular.module('app', []);


app.controller('quoteController', ['$scope','$http', function($scope,$http){
  $http.get('https://en.wikiquote.org/w/api.php?format=jsonp&action=parse&page=Main_Page&prop=text').success(function(data){
    $scope.quote=data;
  });
}]);