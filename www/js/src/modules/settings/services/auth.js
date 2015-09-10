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