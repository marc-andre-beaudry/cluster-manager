'use strict';

var App = angular.module('ClusterManagerApp', [ 'ngRoute' ]);

// Declare app level module which depends on filters, and services
App.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/clusters', {
		templateUrl : 'clusters.html',
		controller : 'clustersController'
	});
	$routeProvider.when('/create', {
		templateUrl : 'create.html',
		controller : 'createController'
	});
	$routeProvider.otherwise({
		redirectTo : '/clusters'
	});
} ]);


App.controller('clustersController', function($scope, $http, $location, $routeParams, $route, $timeout) {

	$scope.isLoadingData = false;
	$scope.loadData = function() {
		$scope.isLoadingData = true;
		$timeout(function() {
            $scope.clusters = [
				{
					proid:"taidsd", 
					ownerId:"beaudmar", 
					name:"ivision", 
					id:1, 
					instances:[
						{id:1, hostname:"igrid935.ms.com", cell:"vi-001-solid", status:"Healthy"}, 
						{id:2, hostname:"igrid936.ms.com", cell:"vi-002-fluid", status:"NotHealthy"},
						{id:3, hostname:"igrid937.ms.com", cell:"vi-003-fluid", status:"Offline"}
					],
					specs: {
						cpu:"200%",
						ram:"48GB",
						disk:"200GB",
						priority:50
					}
				},
				{
					proid:"taidsd", 
					ownerId:"beaudmar", 
					name:"ivision", 
					id:2, 
					instances:[
						{id:1, hostname:"igrid935.ms.com", cell:"vi-001-solid", status:"Healthy"}, 
						{id:2, hostname:"igrid936.ms.com", cell:"vi-002-fluid", status:"NotHealthy"},
						{id:3, hostname:"igrid937.ms.com", cell:"vi-003-fluid", status:"NotHealthy"}
					],
					specs: {
						cpu:"200%",
						ram:"48GB",
						disk:"200GB",
						priority:50
					}
				}
			];
			$scope.isLoadingData = false;
        }, 1000);
	}
	$scope.loadData();
});


App.controller('createController', function($scope, $http, $location, $routeParams, $route, $timeout) {

	$scope.isCreating = false;
	$scope.create = function() {
		$scope.isCreating = true;
		$timeout(function() {
			$scope.isCreating = false;
        }, 1000);
	}
});