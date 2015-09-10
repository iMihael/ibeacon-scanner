angular.module('beacons', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/beacons', {
                templateUrl: 'js/src/modules/beacons/views/list.html'
            });
    }]);
angular.module('settings', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/', {
                templateUrl: 'js/src/modules/settings/views/index.html',
                controller: 'backendSettings'
            });
    }]);
angular.module('settings').controller('backendSettings',  ['$scope', 'settings.auth', function($scope, auth){


    $scope.backend = {
        url: 'http://'
    };

    $scope.form = {
        submitted: false,
        submit: function(){

            $scope.form.submitted = true;

            if($scope.frm.$valid) {
                auth.login($scope.backend.url, $scope.backend.email, $scope.backend.password, function(e){
                    console.log(e);
                }, function(e){
                    console.log(e);
                });
            }
        }
    };

}]);
angular.module('settings').factory('settings.auth', ['$http', function($http){

    return {
        login: function(url, email, password, success, error) {
            $http.post(url + '/v1/users/login', {
                email: email,
                password: password
            })
                .success(success)
                .error(error);
        }
    };

}]);
angular.module('settings').factory('storage', function(){

    var listeners = {};

    var storageEvent = function(e) {
        for(var key in listeners) {
            if (key == e.key && typeof(listeners[key]) == 'function') {
                listeners[key](JSON.parse(e.newValue), JSON.parse(e.oldValue));
            }
        }
    };

    if (window.addEventListener) {
        window.addEventListener("storage", storageEvent, false);
    } else {
        window.attachEvent("onstorage", storageEvent);
    }

    return {
        attachListener: function(key, callback){
            listeners[key] = callback;
        },
        detachListener: function(key){
            delete listeners[key];
        },
        isSet: function(key) {
            if(window.localStorage.getItem(key)) {
                return true;
            }
            return false;
        },
        set: function(key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        get: function(key, defaultValue) {

            if(window.localStorage.getItem(key)) {
                return JSON.parse(window.localStorage.getItem(key));
            }
            return defaultValue;
        },
        remove: function(key){
            window.localStorage.removeItem(key);
        }
    };
});
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