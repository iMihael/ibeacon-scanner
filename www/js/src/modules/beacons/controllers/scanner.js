/*

 function getRandomColor() {
 var letters = '0123456789ABCDEF'.split('');
 var color = '#';
 for (var i = 0; i < 6; i++ ) {
 color += letters[Math.floor(Math.random() * 16)];
 }
 return color;
 }
 */

angular.module('settings').controller('scanBeacons',  ['$scope', '$rootScope', 'storage', '$location', function($scope, $rootScope, storage, $location){

    $scope.log = "";

    $rootScope.rightBtn = {
        url : '#/beacons',
        content: 'Back'
    };

    $scope.selectedBeacons = storage.get('selectedBeacons', []);
    $scope.getBeaconIdentifier = function(uuid, major, minor){
        for(var i in $scope.selectedBeacons) {
            var b = $scope.selectedBeacons[i];
            if(b.uuid == uuid && b.major == major && b.minor == minor) {
                return b.identifier;
            }
        }
    };

    if($scope.selectedBeacons.length > 0) {

        var series = [];
        for(var i in $scope.selectedBeacons) {
            series.push({
                name: $scope.selectedBeacons[i].identifier,
                data: []
            });
        }

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                defaultSeriesType: 'spline',
                events: {
                    load: $scope.getData
                }
            },
            title: false,
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000
            },
            plotOptions: {
                series: {
                    animation: false
                },
                line: {
                    animation: false
                }
            },
            yAxis: {
                minPadding: 0.2,
                maxPadding: 0.2,
                title: {
                    text: 'RSSI',
                    margin: 10
                }
            },
            series: series
        });

        var delegate = new cordova.plugins.locationManager.Delegate();
        cordova.plugins.locationManager.requestWhenInUseAuthorization();
        cordova.plugins.locationManager.setDelegate(delegate);

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            if(pluginResult.beacons && pluginResult.beacons.length > 0) {

                for(var i in pluginResult.beacons) {
                    var b = pluginResult.beacons[i];
                    var name = $scope.getBeaconIdentifier(b.uuid, b.major, b.minor);

                    for(var j in chart.series) {
                        if(chart.series[j].name == name) {
                            var shift = chart.series[j].data.length > 20;
                            chart.series[j].addPoint([Date.now(), b.rssi], true, shift);
                        }
                    }
                }

            }
        };

        for(var i in $scope.selectedBeacons) {
            var b = $scope.selectedBeacons[i];
            var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(b.identifier, b.uuid, b.major, b.minor);
            cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion).done();
        }

    }


}]);