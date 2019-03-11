var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

myApp.controller('myAppController', function ($scope, UserFactory) {
  //GET
  $scope.getClient = function() {
    $scope.client = new UserFactory.getMethod({id:$scope.id});
    $scope.client.$promise.then(function(res) {
      let data = res;
      console.log(res.id);
    });
  };
});


myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/', {
      templateUrl: 'views/presentation.html',
      controller: 'myAppController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'myAppController'
    })
    .when('/creer', {
      templateUrl: 'views/creerCompte.html',
      controller: 'myAppController'
    })
}]);

myApp.factory('UserFactory', ['$resource', function($resource) {
  return $resource('/user/:id', {}, {
    getMethod:  {
      method: 'GET',
    },
    postMethod: {
      url : '/user/',
      method: 'POST',
    } 
  });
}]);