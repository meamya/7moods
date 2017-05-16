var app = angular.module('MyApp', ["ngRoute"]);
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'public/components/home.html',
            controller: 'NavCtrl'
        })
        .when('/root', {
            templateUrl: 'public/components/chakra/Root/root.html',
        })
        .when('/solarplexus', {
            templateUrl: 'public/components/chakra/Solarplexus/solarplexus.html',
        })
        .when('/heart', {
            templateUrl: 'public/components/chakra/Heart/heart.html',
        })
        .when('/throat', {
            templateUrl: 'public/components/chakra/Throat/throat.html',
        })
        .when('/thirdeye', {
            templateUrl: 'public/components/chakra/ThirdEye/thirdeye.html',
        })
        .when('/crown', {
            templateUrl: 'public/components/chakra/Crown/crown.html',
        })
        .when('/about', {
            templateUrl: 'public/about.html',
        })
        .when('/partner', {
            templateUrl: 'public/partner.html',
        })
        .when('/contact', {
            templateUrl: 'public/contact.html',
        })
        .when('/shop',{
            templateUrl: 'public/shop.html',
        })
        .when('/sacral',{
            templateUrl: 'public/components/chakra/Sacral/sacral.html',
        })
        .when('/recommendation',{
            templateUrl: 'public/components/recommendation.html',
        })
        .when('/signup',{
            templateUrl: 'public/components/auth/signup/signup.html',
        });
}]);

app.factory('getChakras',['$http', function ($http) {
  return {
      getChakras: function () {
        return $http.get('/api/chakras'); // http://localhost:3000//api/chakras
      }
   };
}]);

app.controller('rootCtrlr', function($scope, $http, getChakras) {
        $http.get("/api/chakras").then(function(response) {
            $scope.chakras = response.data;
        })
        .then(function(){
        // getChakras.getChakras().then(function (data) {
            $scope.currentPage = 0;
            $scope.pageSize = 1;
            $scope.data = $scope.chakras;
            // $scope.data.push($scope.chakras);
            $scope.numberOfPages=function(){
                return Math.ceil($scope.data.length/$scope.pageSize);                
            }
        });
});

app.controller('solarplexusCtrlr', function($scope, $http, getChakras) {
        $http.get("/api/chakras").then(function(response) {
            $scope.chakras = response.data;
        })
        .then(function(){
        // getChakras.getChakras().then(function (data) {
            $scope.currentPage = 2;
            $scope.pageSize = 1;
            $scope.data = $scope.chakras;
            // $scope.data.push($scope.chakras);
            $scope.numberOfPages=function(){
                return Math.ceil($scope.data.length/$scope.pageSize);                
            }
        });
});

app.controller('sacralCtrlr', function($scope, $http, getChakras) {
        $http.get("/api/chakras").then(function(response) {
            $scope.chakras = response.data;
        })
        .then(function(){
        // getChakras.getChakras().then(function (data) {
            $scope.currentPage = 1;
            $scope.pageSize = 1;
            $scope.data = $scope.chakras;
            // $scope.data.push($scope.chakras);
            $scope.numberOfPages=function(){
                return Math.ceil($scope.data.length/$scope.pageSize);                
            }
        });
});

app.controller('heartCtrlr', function($scope, $http, getChakras) {
        $http.get("/api/chakras").then(function(response) {
            $scope.chakras = response.data;
        })
        .then(function(){
        // getChakras.getChakras().then(function (data) {
            $scope.currentPage = 4;
            $scope.pageSize = 1;
            $scope.data = $scope.chakras;
            // $scope.data.push($scope.chakras);
            $scope.numberOfPages=function(){
                return Math.ceil($scope.data.length/$scope.pageSize);                
            }
        });
});

app.controller('throatCtrlr', function($scope, $http, getChakras) {
        $http.get("/api/chakras").then(function(response) {
            $scope.chakras = response.data;
        })
        .then(function(){
        // getChakras.getChakras().then(function (data) {
            $scope.currentPage = 3;
            $scope.pageSize = 1;
            $scope.data = $scope.chakras;
            // $scope.data.push($scope.chakras);
            $scope.numberOfPages=function(){
                return Math.ceil($scope.data.length/$scope.pageSize);                
            }
        });
});

app.controller('thirdeyeCtrlr', function($scope, $http, getChakras) {
        $http.get("/api/chakras").then(function(response) {
            $scope.chakras = response.data;
        })
        .then(function(){
        // getChakras.getChakras().then(function (data) {
            $scope.currentPage = 5;
            $scope.pageSize = 1;
            $scope.data = $scope.chakras;
            // $scope.data.push($scope.chakras);
            $scope.numberOfPages=function(){
                return Math.ceil($scope.data.length/$scope.pageSize);                
            }
        });
});

app.controller('crownCtrlr', function($scope, $http, getChakras) {
        $http.get("/api/chakras").then(function(response) {
            $scope.chakras = response.data;
        })
        .then(function(){
        // getChakras.getChakras().then(function (data) {
            $scope.currentPage = 6;
            $scope.pageSize = 1;
            $scope.data = $scope.chakras;
            // $scope.data.push($scope.chakras);
            $scope.numberOfPages=function(){
                return Math.ceil($scope.data.length/$scope.pageSize);                
            }
        });
});

app.filter('startFrom',function() {
    return function(input, start) {
        start = +start; //parse to int
        console.log(input.slice(start))
        return input.slice(start);
    }
});

app.controller('SignUpCtrlr', function($scope, $http, $location) {
    $scope.signup = function() {
        var data = {
            firstname: $scope.firstName,
            lastname: $scope.lastName,
            email: $scope.email,
            state: $scope.state,
            address: $scope.address,
            password: $scope.password
        };
         $http.post('/api/signup', data)
         .then(function(response){
             console.log(response);
             if(response.data.success){
                 $location.path("/signin")
             }
         },function(error){
             console.log(error);
         });
               }
});
app.controller('ShopCtrlr', function($scope, $timeout, $http, $location){
   // $scope.boxes = [];
    $http.get("/api/shop").then(function(response) {
            $scope.boxes = response.data;
        });      
});




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