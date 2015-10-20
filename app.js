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

	$scope.ownerId = "beaudmar";
	$scope.onlyMine = true;
	$scope.isLoadingData = false;
	$scope.showAdvancedSettings = false;
	$scope.clusters = [];

	var receivedClusters = [];

	$scope.filter = function() {
		$scope.clusters = [];
		receivedClusters.forEach(function(entry) {
			if(entry.ownerId == $scope.ownerId || !$scope.onlyMine) {
				$scope.clusters.push(entry);
			}
		});
	}

	$scope.$watch('onlyMine', function(newVal, oldVal){
		$scope.filter();
	}, true);

	$scope.loadData = function() {
		$scope.isLoadingData = true;
		$timeout(function() {
			receivedClusters = [
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
				},
				{
					proid:"taidsd", 
					ownerId:"colleser", 
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
				}
			];
			$scope.filter();
			$scope.isLoadingData = false;
        }, 1000);
	}
	$scope.loadData();
		
	$scope.startInstance = function(instance) {
		instance.actionInProgress = true;
		$timeout(function() {
			instance.actionInProgress = false;
			instance.status = "NotHealthy";
        }, 1000);
	}
	
	$scope.stopInstance = function(instance) {
		instance.actionInProgress = true;
		$timeout(function() {
			instance.actionInProgress = false;
			instance.status = "Offline";
        }, 1000);
	}
});


App.controller('createController', function($scope, $http, $location, $routeParams, $route, $timeout) {

	$scope.identity = { proid:"taidsd", ownerId:"beaudmar", name:"ivision", id:1 };
	$scope.hardware = { cpu:800, ram:8192, storage:300, priority:50 };
	$scope.options = { dataNodes:3, forestReplicas:2, mode:"Hybrid" };
	$scope.locations = [];

	$scope.$watch('options.dataNodes', function(newVal, oldVal){
		var oldArray = $scope.locations;
		$scope.locations = [];
    	for(var i = 0; i < $scope.options.dataNodes; i++) {
			if(oldArray[i] !== undefined) {
				$scope.locations.push(oldArray[i]);
			} else {
				var newLocation = { name: $scope.identity.proid + "." + $scope.identity.ownerId + "." + $scope.identity.name + "." + $scope.identity.id + "." + (i + 1), 
									location: "vi-001-solid" };
				$scope.locations.push(newLocation);
			}
    	}
	}, true);
	
	$scope.isCreating = false;
	$scope.create = function() {
		$scope.isCreating = true;
		console.log($scope.options);
		$timeout(function() {
			$scope.isCreating = false;
        }, 1000);
	}
});