angular.module('settings').controller('backendSettings',  ['$scope', 'settings.auth', 'storage', '$location',
    function($scope, auth, storage, $location){

    if(storage.isSet('backend') && storage.isSet('user')) {
        $location.path('/beacons');
    } else {
        $scope.backend = {
            url: 'http://'
        };
    }



    $scope.form = {
        error: false,
        submitted: false,
        submit: function(){

            $scope.form.submitted = true;

            if($scope.frm.$valid) {
                auth.login($scope.backend.url, $scope.backend.email, $scope.backend.password, function(user){
                    storage.set('backend', $scope.backend);
                    storage.set('user', user);

                    $location.path('/beacons');
                }, function(){
                    $scope.form.error = true;
                });
            }
        }
    };

}]);