angular.module('app', [
    'ngRoute',
    'angular-loading-bar',
    'settings',
    'beacons'
]).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
}]);