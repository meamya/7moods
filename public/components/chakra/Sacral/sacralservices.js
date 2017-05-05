var app = angular.module("7moods", ['ngRoute']);

app.service("sacralService", function ($http, $q) {
        var deferred = $q.defer();
        $http.get("public/components/chakra.json").then(function(data)
        {;
        deferred.resolve(data);
});
    this.getChakras = function()
{
    return deferred.promise;
}       
})
.controller("sacralCtrl", function($scope,sacralService){;
    var promise = sacralService.getChakras();
    promise.then(function(data)
                 {
        $scope.name = data;
        console.log($scope.name);
    });
    
})