var app = angular.module("7moods", ['ngResource']);

app.controller('rootCtrlr', ['$scope', function($scope) {
  $scope.about = 'this is about the crown chakra';
}]);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
	$routeProvider
		.when('/root', {
			templateUrl: 'components/chakra/root.html',
			controller: 'rootCtrlr'
		})
		.when('/crown', {
			templateUrl: 'crown.html',
			controller: 'crownCtrlr'
		});
}]);
