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