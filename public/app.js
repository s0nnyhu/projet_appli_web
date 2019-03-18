var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

myApp.controller('myAppController', function ($scope, $window, UserFactory) {
  $scope.creerCompte = function() {
    var compteToSave = new UserFactory();
    compteToSave.nom = $scope.nom;
    compteToSave.prenom = $scope.prenom;
    compteToSave.adresse = $scope.adresse;
    compteToSave.mail = $scope.mail;
    compteToSave.tel = $scope.tel;
    compteToSave.$save(function(compteToSave) {
      $scope.resultat = compteToSave;
      $window.location.href = '/compteCree';
    }, function(error) {
      $scope.resultat = error.data.error;
    });
  };
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
  .when('/compteCree', {
    templateUrl: 'views/CompteCree.html',
    controller: 'myAppController'
  })
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
  return $resource('/user/:id', {id: '@_id'}, {

  });
}]);