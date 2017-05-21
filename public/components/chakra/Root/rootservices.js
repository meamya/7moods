// var app = angular.module("7moods", ['ngRoute']);
//
// app.service("rootService", function ($http, $q) {
//         var deferred = $q.defer();
//         $http.get("public/components/chakra.json").then(function(data)
//         {;
//         deferred.resolve(data);
// });
//     this.getChakras = function()
// {
//     return deferred.promise;
// }
// })
// .controller("rootCtrl", function($scope,rootService){;
//     var promise = rootService.getChakras();
//     promise.then(function(data)
//                  {
//         $scope.name = data;
//         console.log($scope.name);
//     });
//
// })