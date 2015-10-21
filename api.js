App.factory('clusterApi', function($http) {
	return {
		getUserId : function() {
			return new Promise(function(success, failure) {
				success("beaudmar");
			});
		},
		// Get all clusters with their instances
		getClusters : function() {
			return new Promise(function(success, failure) {
				var data = 
				[
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
				success(data);
			});
},
		// Create a new cluster with generic config
		createCluster : function() {
			return new Promise(function(success, failure) {
				success();
			});
		},
		// Delete the cluster
		deleteCluster : function() {
			return new Promise(function(success, failure) {
				success();
			});
		},
		// Start an instance within a cluster
		startInstance : function(instance) {		
			return new Promise(function(success, failure) {
				success();
			});
		},
		// Stop an instance within a cluster
		stopInstance : function(instance) {
			return new Promise(function(success, failure) {
				success();
			});
		},
		// Get the script to execute in order to create a load balancer
		getCreateLBScript : function(cluster) {
			return new Promise(function(success, failure) {
				success();
			});			
		},
		// Get the available configs for applications
		getConfigs : function() {
			return new Promise(function(success, failure) {
				success();
			});
		}
	};
});