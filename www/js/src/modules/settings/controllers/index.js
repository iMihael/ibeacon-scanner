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