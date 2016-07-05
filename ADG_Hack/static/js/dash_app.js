var adgDashApp=angular.module("adgDashApp",[
	'ngRoute',
	'adgDashAppControllers'
	]);

adgDashApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when('/:userId', {
		templateUrl:'partials/user_profile.html',
		controller:'profileCtrl'
	}).
	otherwise({
		redirectTo:'/john'
	});
}]);
