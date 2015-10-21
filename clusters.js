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
			//success callback
			function(data, status) {
				receivedClusters = data;		
				$scope.filter();
				$scope.isLoadingData = false;
				$scope.$apply();	
			}, 
			//failure callback
			function(data, status) {
				$scope.isLoadingData = false;
				$scope.$apply();	
			}
			);			
	}
	
	$scope.startInstance = function(instance) {
		// TODO Replace this because browser dialog is not shiny.
		if(!confirm("Do you want to start that instance?")) {
			return;
		}
		
		instance.actionInProgress = true;
		clusterApi.startInstance(instance).then(
			//success callback
			function(data, status) {			
				instance.actionInProgress = false;
				instance.status = "NotHealthy";
				$scope.$apply();	
			}, 
			//failure callback
			function(data, status) {
				instance.actionInProgress = false;				
				$scope.$apply();	
			}
			);
	}
	
	$scope.stopInstance = function(instance) {
		// TODO Replace this because browser dialog is not shiny.
		if(!confirm("Do you want to stop that instance?")) {
			return;
		}
		
		instance.actionInProgress = true;
		clusterApi.stopInstance(instance).then(
			//success callback
			function(data, status) {			
				instance.actionInProgress = false;
				instance.status = "Offline";
				$scope.$apply();	
			}, 
			//failure callback
			function(data, status) {
				instance.actionInProgress = false;
				$scope.$apply();	
			}
			);
	}
	
	$scope.deleteCluster = function(cluster) {
		// TODO Replace this because browser dialog is not shiny.
		if(!confirm("Do you want to delete that cluster?")) {
			return;
		}
		cluster.actionInProgress = true;
		clusterApi.deleteCluster(cluster).then(
			//success callback
			function(data, status) {
				// Remove cluster from list
				// Cluster is equal if proid.ownerId.name.id match.
				for(var i = receivedClusters.length - 1; i >= 0; i--) {
					if(	receivedClusters[i].proid == cluster.proid && 
						receivedClusters[i].ownerId == cluster.ownerId && 
						receivedClusters[i].name == cluster.name && 
						receivedClusters[i].id == cluster.id) {
						receivedClusters.splice(i, 1);
				}
			}
			$scope.filter();
			cluster.actionInProgress = false;
			$scope.$apply();	
		}, 
			//failure callback
			function(data, status) {
				cluster.actionInProgress = false;
				$scope.$apply();	
			}
			);
	}
	
	$scope.getCreateLBScript = function(cluster) {
		clusterApi.getCreateLBScript(cluster).then(
			function(data, status) {
				confirm("asdasdasd \n asdasdasd \n asdasdasd \n asdasdasd \n asdasdasd \n");
			},
			function(data, status) {
				
			}
			);
	}
	$scope.loadData();
});