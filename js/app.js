angular.module('website', ['ngAnimate'])
    .controller('MainCtrl', ['$scope', '$window', 'InstanceService',
        function ($scope, $window, InstanceService) {
            $scope.categories = InstanceService.getCategories();
            $scope.instances = InstanceService.getInstances();

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

        }])
    
    .factory('InstanceService', function () {
        var categories = [
            {name: 'standard', display: 'Standard'},
            {name: 'highmemory', display: 'High Memory'},
            {name: 'highcpu', display: 'High CPU'},
            {name: 'highio', display: 'High I/O'}
        ];

        var instances = [
            { id: '1_1', category: 'standard', ram: '0.625', cpu: '0.15', disk: '20', network: '10', price: '0.020'},
            { id: '1_2', category: 'standard', ram: '1.75', cpu: '1', disk: '56', network: '10', price: '0.056'},
            { id: '1_3', category: 'standard', ram: '3.75', cpu: '1', disk: '123', network: '10', price: '0.12'},
            { id: '2_1', category: 'highmemory', ram: '17.125', cpu: '2', disk: '420', network: '10', price: '0.409'},
            { id: '2_2', category: 'highmemory', ram: '34.25', cpu: '4', disk: '843', network: '10', price: '0.817'},
            { id: '2_3', category: 'highmemory', ram: '68.375', cpu: '8', disk: '1122', network: '10', price: '1.630'},
            { id: '3_1', category: 'highcpu', ram: '1.75', cpu: '2', disk: '75', network: '10', price: '0.127'},
            { id: '3_2', category: 'highcpu', ram: '7', cpu: '7', disk: '263', network: '10', price: '0.508'},
            { id: '3_3', category: 'highcpu', ram: '16', cpu: '16', disk: '600', network: '10', price: '1.160'},
            { id: '4_1', category: 'highio', ram: '60.5', cpu: '8', disk: '1452', network: '10', price: '3.067'},
            { id: '4_2', category: 'highio', ram: '128', cpu: '16', disk: '3072', network: '10', price: '6.488'},
            { id: '4_3', category: 'highio', ram: '256', cpu: '32', disk: '6144', network: '10', price: '12.976'}
        ];

        var getCategories = function () {
            return categories;
        };

        var getInstances = function () {
            return instances;
        };

        return {
            getCategories: getCategories,
            getInstances: getInstances
        }
    });