angular.module('settings').controller('listBeacons',  ['$scope', '$rootScope', 'beacons.beacons', 'storage', function($scope, $rootScope, beacons, storage){

    $rootScope.title = 'iBeacons';
    $rootScope.rightBtn = {
        url: '#/beacons/scan',
        content: 'Scan'
    };

    $scope.beacons = [];
    $scope.selectedBeacons = storage.get('selectedBeacons', []);

    $scope.pagination = {
        page: 1,
        nextPage: function(){
            $scope.pagination.page++;
            $scope.getData();
        }
    };

    $scope.beaconToggle = function(beacon){
        //$scope.selectedBeacons = [];

        var toAdd = true;

        for(var i in $scope.selectedBeacons) {
            if($scope.selectedBeacons[i].identifier == beacon.identifier) {
                $scope.selectedBeacons.splice(i, 1);
                toAdd = false;
                break;
            }
        }

        if(toAdd) {
            $scope.selectedBeacons.push(beacon);
        }

        //for(var i in $scope.beacons) {
        //    if($scope.beacons[i].hasOwnProperty('selected') && $scope.beacons[i].selected) {
        //        $scope.selectedBeacons.push($scope.beacons[i]);
        //    }
        //}

        storage.set('selectedBeacons', $scope.selectedBeacons);
    };

    $scope.getData = function(){
        beacons.get($scope.search.value, $scope.pagination.page, function(data, pagination){
            for(var i in pagination) {
                $scope.pagination[i] = pagination[i];
            }

            for(var i in data) {
                if(data[i].hasOwnProperty('minor')) {

                    for(var j in $scope.selectedBeacons) {
                        if($scope.selectedBeacons[j].id == data[i].id) {
                            data[i]['selected'] = true;
                        }
                    }

                    $scope.beacons.push(data[i]);
                }
            }

        });
    };



    $scope.search = {
        value: '',
        change: function(){
            $scope.beacons = [];
            $scope.pagination.page = 1;
            $scope.getData();
        }
    };

    $scope.getData();
}]);