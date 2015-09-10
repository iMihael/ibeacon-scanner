angular.module('settings', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/', {
                templateUrl: 'js/src/modules/settings/views/index.html',
                controller: 'backendSettings'
            });
    }]);