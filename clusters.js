App.controller('clustersController', function($scope, $http, $location, $routeParams, $route, $timeout, clusterApi) {

	$scope.ownerId = "beaudmar";
	$scope.onlyMine = true;
	$scope.isLoadingData = false;
	$scope.showAdvancedSettings = false;
	$scope.clusters = [];

	var receivedClusters = [];

	// "OnlyMine" filter
	$scope.filter = function() {
		$scope.clusters = [];
		receivedClusters.forEach(function(entry) {
			if(entry.ownerId == $scope.ownerId || !$scope.onlyMine) {
				$scope.clusters.push(entry);
			}
		});
	}

	// Watcher for onlyMine variable
	$scope.$watch('onlyMine', function(newVal, oldVal){
		$scope.filter();
	}, true);

	$scope.loadData = function() {	
		$scope.isLoadingData = true;
		clusterApi.getClusters().then(
			function(data, status) {
				receivedClusters = data;		
				$scope.filter();
				$scope.isLoadingData = false;
				$scope.$apply();	
			}, 
			function(data, status) {
				$scope.isLoadingData = false;
				$scope.$apply();	
			}
		);			
	}
		
	$scope.startInstance = function(instance) {
		instance.actionInProgress = true;
		clusterApi.startInstance(instance).then(
			function(data, status) {			
				instance.actionInProgress = false;
				instance.status = "NotHealthy";
				$scope.$apply();	
			}, 
			function(data, status) {
				instance.actionInProgress = false;				
				$scope.$apply();	
			}
		);
	}
	
	$scope.stopInstance = function(instance) {
		instance.actionInProgress = true;
		clusterApi.stopInstance(instance).then(
			function(data, status) {			
				instance.actionInProgress = false;
				instance.status = "Offline";
				$scope.$apply();	
			}, 
			function(data, status) {
				instance.actionInProgress = false;
				$scope.$apply();	
			}
		);
	}
	$scope.loadData();
});