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



