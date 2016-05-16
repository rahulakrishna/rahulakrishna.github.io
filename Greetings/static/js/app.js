var krisApp=angular.module('krisApp', [
        'ngRoute',
        'krisAppControllers',
        'ui.materialize'
    ]);

krisApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/',
            {
                templateUrl:'template/partials/view.html'
//                controller:'cardsCtrl'
            }).otherwise({
            redirectTo:'/'
        });
    }
]);