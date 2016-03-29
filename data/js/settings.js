angular.module('evSettings', [])
    .controller('evSettingsController', function($scope, $window) {
        $scope.data = {};
        $scope.showChannels = false;
        $scope.filter = "";
        $window.self.port.on('loadData', function(data) {
            $scope.$apply(function() {
                $scope.data = data;
            });
        });
        $scope.save = function() {
            $window.self.port.emit('saveData', $scope.data);
            $scope.showChannels = false;
        };
        $scope.patreon = function() {
            $window.self.port.emit('patreon');
        }
    })
    //https://github.com/petebacondarwin/angular-toArrayFilter
    .filter('toArray', function() {
        return function(obj, addKey) {
            if (!angular.isObject(obj)) return obj;
            if (addKey === false) {
                return Object.keys(obj)
                    .map(function(key) {
                        return obj[key];
                    });
            } else {
                return Object.keys(obj)
                    .map(function(key) {
                        var value = obj[key];
                        return angular.isObject(value) ? Object.defineProperty(value, '$key', {
                            enumerable: false,
                            value: key
                        }) : {
                            $key: key,
                            $value: value
                        };
                    });
            }
        };
    });