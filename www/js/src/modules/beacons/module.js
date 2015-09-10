angular.module('beacons', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/beacons', {
                templateUrl: 'js/src/modules/beacons/views/list.html'
            });
    }]);