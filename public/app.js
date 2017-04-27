var app = angular.module("7moods", ['ngRoute'])

               
.config(function($routeProvider) {
  $routeProvider
  
  .when("/", {
			templateUrl: "components/root/root.html",
			controller: "rootCtlr",
		})
  .otherwise({
    redirectTo: "templates/home.html"
  });
});




		


