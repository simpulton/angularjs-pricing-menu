angular.module('website', ['ngAnimate', 'firebase'])
    .controller('MainCtrl', ['$scope', '$window', 'PricingService', 'TotalCountService',
        function ($scope, $window, PricingService, TotalCountService) {
            $scope.pricing = PricingService.getPricing();

            // INSTANCE
            $scope.currentInstance = null;

            $scope.setCurrentInstance = function (instance) {
                $scope.currentInstance = instance;
            };

            $scope.isCurrentInstance = function (instance) {
                return $scope.currentInstance === instance;
            };

            // INSTANCE CATEGORY
            $scope.currentInstanceCategory = null;

            $scope.setCurrentInstanceCategory = function (category) {
                $scope.currentInstanceCategory = category;
            };

            $scope.isMuted = function (category) {
                return $scope.currentInstanceCategory !== null && $scope.currentInstanceCategory !== category;
            };

            // COUNTS
            $scope.currentPricingCategory = null;

            $scope.instanceCounts = function () {
                return TotalCountService.getInstanceCounts();
            };

            $scope.setCurrentPricingCategory = function (category) {
                if ($scope.currentPricingCategory != null) {
                    TotalCountService.decrementInstanceCount($scope.currentPricingCategory);
                }
                $scope.currentPricingCategory = category;
                TotalCountService.incrementInstanceCount($scope.currentPricingCategory);
            };

            $window.onbeforeunload = function (event) {
                if ($scope.currentPricingCategory !== null) {
                    TotalCountService.decrementInstanceCount($scope.currentPricingCategory);
                }
            }

        }])
    .factory('TotalCountService', ['$firebase', function ($firebase) {
        var ref = new Firebase('https://ng-menu.firebaseio.com/instance-count');
        var instanceCounts = $firebase(ref);

        var getInstanceCounts = function () {
            return instanceCounts;
        }

        var incrementInstanceCount = function (type) {
            ref.child(type).transaction(function (current_value) {
                return current_value + 1;
            });
        };

        var decrementInstanceCount = function (type) {
            ref.child(type).transaction(function (current_value) {
                return current_value - 1;
            });
        };

        return {
            getInstanceCounts: getInstanceCounts,
            decrementInstanceCount: decrementInstanceCount,
            incrementInstanceCount: incrementInstanceCount
        }
    }])
    .factory('PricingService', function () {
        var pricing = [
            {
                category: 'standard',
                display: 'Standard',
                instances: [
                    { id: '1_1', ram: '0.625', cpu: '0.15', disk: '20', network: '10', price: '0.020'},
                    { id: '1_2', ram: '1.75', cpu: '1', disk: '56', network: '10', price: '0.056'},
                    { id: '1_3', ram: '3.75', cpu: '1', disk: '123', network: '10', price: '0.12'}
                ]
            },
            {
                category: 'highmemory',
                display: 'High Memory',
                instances: [
                    { id: '2_1', ram: '17.125', cpu: '2', disk: '420', network: '10', price: '0.409'},
                    { id: '2_2', ram: '34.25', cpu: '4', disk: '843', network: '10', price: '0.817'},
                    { id: '2_3', ram: '68.375', cpu: '8', disk: '1122', network: '10', price: '1.630'}
                ]
            },
            {
                category: 'highcpu',
                display: 'High CPU',
                instances: [
                    { id: '3_1', ram: '1.75', cpu: '2', disk: '75', network: '10', price: '0.127'},
                    { id: '3_2', ram: '7', cpu: '7', disk: '263', network: '10', price: '0.508'},
                    { id: '3_3', ram: '16', cpu: '16', disk: '600', network: '10', price: '1.160'}
                ]
            },
            {
                category: 'highio',
                display: 'High I/O',
                instances: [
                    { id: '4_1', ram: '60.5', cpu: '8', disk: '1452', network: '10', price: '3.067'},
                    { id: '4_2', ram: '128', cpu: '16', disk: '3072', network: '10', price: '6.488'},
                    { id: '4_3', ram: '256', cpu: '32', disk: '6144', network: '10', price: '12.976'}
                ]
            }
        ];

        var getPricing = function () {
            return pricing;
        };

        return {
            getPricing: getPricing
        }
    });