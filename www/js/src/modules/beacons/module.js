angular.module('beacons', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider){

        var viewPath = 'js/src/modules/beacons/views/';

        $routeProvider
            .when('/beacons', {
                templateUrl: viewPath + 'list.html',
                controller: 'listBeacons',
                title: 'iBeacons'
            })
            .when('/beacons/scan', {
                templateUrl: viewPath + 'scanner.html',
                controller: 'scanBeacons',
                title: 'Scanner'
            });
    }]);