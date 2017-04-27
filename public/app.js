var app = angular.module('MyApp', ["ngRoute"]);
app.config(['$locationProvider', '$routeProvider' ,function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
        templateUrl: 'public/components/home.html',
        controller: 'NavCtrl'
    })
        .when('/root', {
        templateUrl: 'public/components/chakra/Root/root.html'
    });
}]);






//var app = angular.module("7moods", ['ngRoute'])
//
//               
//.config(function($routeProvider) {
//  $routeProvider
//  
//  .when("/", {
//			templateUrl: "components/root/root.html",
//			controller: "rootCtlr",
//		})
//  .otherwise({
//    redirectTo: "templates/home.html"
//  });
//});




		


