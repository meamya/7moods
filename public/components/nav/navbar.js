// var app = angular.module("7moods", [])
//   .config(function ($routeProvider, $locationProvider, $httpProvider) {
//
//     $routeProvider.when('/',
//     {
//       templateUrl:    'home.html',
//       controller:     'HomeCtrl'
//     });
//     $routeProvider.when('/about',
//     {
//       templateUrl:    'about.html',
//       controller:     'AboutCtrl'
//     });
//     $routeProvider.when('/contact',
//     {
//       templateUrl:    'contact.html',
//       controller:     'ContactCtrl'
//     });
//     $routeProvider.otherwise(
//     {
//       redirectTo:     '/',
//       controller:     'HomeCtrl',
//     }
//   );
// });
//
// app.controller('NavCtrl',
// ['$scope', '$location', function ($scope, $location) {
//   $scope.navClass = function (page) {
//     var currentRoute = $location.path().substring(1) || 'home';
//     return page === currentRoute ? 'active' : '';
//   };
// }]);
//
// app.controller('AboutCtrl', function($scope, $compile) {
//   console.log('inside about controller');
//
// });
//
// app.controller('HomeCtrl', function($scope, $compile) {
//   console.log('inside home controller');
//
// });
//
// app.controller('ContactCtrl', function($scope, $compile) {
//   console.log('inside contact controller');
// });