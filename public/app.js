var myApp = angular.module('myApp', ['ngResource','ngSanitize', 'ngRoute']);

myApp.controller('myAppController', function ($scope, $rootScope, $window, $location, UserFactory, User, MessageFactory, OffreFactory, FAQFactory) {
  /*Le raffraichissement d'une page redémarre le controlleur, on récupère donc les informations relatifs à l'utilisateur connecté via un service */
  $rootScope.user = JSON.parse(localStorage.getItem('user'));

  /****
   * Partie Offres
   */
  $scope.creerOffre = function() {
    var offreToSave = new OffreFactory();
    offreToSave.type = $scope.type;
    offreToSave.nom_societe = $scope.nom_societe;
    offreToSave.sujet = $scope.sujet;
    offreToSave.adresse = $scope.adresse;
    offreToSave.mail_contact = $scope.mail_contact;
    offreToSave.telephone_contact = $scope.telephone_contact;
    offreToSave.$save(function(offreToSave) {
      $scope.resultatOffre = `<div class="alert alert-success" role="alert">L'offre a bien été enregistré!</div>`;
    }, function (error) {
      $scope.resultatOffre = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
    })
  };

  $scope.getAllOffre = function() {
    var offres = OffreFactory.get();
    if (offres) {
      $scope.listOffres=offres;
    }
    else {
      console.log("Erreur");
    }
   };

  /**
   * Partie Message
   */
  $scope.creerMessage = function() {
    var messageToSave = new MessageFactory();
    //Si l'utilisateur est connecté, alors on récupère son id
    if ($rootScope.user != null) {
      messageToSave.id_auteur = $rootScope.user.id;
    }
    //sinon c'est donc un utilisateur anonyme
    else {
      messageToSave.id_auteur = null;
    }
    messageToSave.contenu = $scope.contenu;
    messageToSave.reponse = null;
    messageToSave.$save(function(messageToSave) {
      $scope.resultat = `<div class="alert alert-success" role="alert">Votre message a bien été envoyé!</div>`;
    }, function(error) {
      $scope.resultat = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
    });
  }

  $scope.getMessage = function(id_auteur) {
    MessageFactory.get({ id: id_auteur }, function(data) {
      $scope.listMessageUser = data;
    }, function(error) {
      $scope.listMessageUser=error.data.error;
    });
  };

  $scope.repondreMessage = function(id_message, content) {
    // On crée le message réponse et on récupère son id
    var messageToSave = new MessageFactory();
    messageToSave.id_auteur = $rootScope.user.id;
    messageToSave.contenu = content;
    messageToSave.reponse = 0;
    messageToSave.$save(function(messageToSave) {
      // A partir de l'id du message réponse crée et de l'id du message actuelle (sans réponse)
      // On procède sa mise à jour
      console.log(messageToSave.id);
      var tmp = {};
      tmp.id = messageToSave.id;
      console.log(tmp);
      MessageFactory.update({id: id_message}, tmp, function() {
        $scope.resultatMessage = `<div class="alert alert-success" role="alert">"Réponse enregistrée!"</div>`;
      }, function(error) {
        console.log(error);
        $scope.resultatMessage = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
      });
    }, function(error) {
      $scope.resultat = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
    });
  };

  $scope.getAllMessage = function() {
    var messages = MessageFactory.get();
    if (messages) {
      $scope.listMessage=messages;
    }
    else {
      console.log("Erreur");
    }
   };

   $scope.ajouterFAQ = function(id_message) {
    var status = {};
    status.inFAQ = true;
    FAQFactory.update({id: id_message}, status, function(data) {
      $scope.resultatMessage = `<div class="alert alert-success" role="alert">"Réponse enregistrée!"</div>`;
      setTimeout(function() {
        window.location.reload();
      }, 500);
     }, function(error) {
      $scope.resultatMessage = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
      setTimeout(function() {
        window.location.reload();
      }, 500);
     });
   };

   $scope.retirerFAQ = function(id_message) {
     var status = {};
     status.inFAQ = false;
     FAQFactory.update({id: id_message}, status, function(data) {
      $scope.resultatMessage = `<div class="alert alert-success" role="alert">"Réponse enregistrée!"</div>`;
      window.location.reload();
     }, function(error) {
      $scope.resultatMessage = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
     });
  }
  /**
   * Partie Utilisateur
   */
  $scope.creerCompte = function() {
    var compteToSave = new UserFactory();
    compteToSave.nom = $scope.nom;
    compteToSave.prenom = $scope.prenom;
    compteToSave.adresse = $scope.adresse;
    compteToSave.mail = $scope.mail;
    compteToSave.tel = $scope.tel;
    compteToSave.$save(function(compteToSave) {
      $scope.resultat = compteToSave;
      $location.path('/compteCree');
    }, function(error) {
      $scope.resultat = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
    });
  };

  $scope.login = function() {
    if (typeof $scope.mail === 'undefined' || $scope.mail == '') {
      $scope.resultat = "Veuillez saisir votre adresse email!"
    }
    else {
      UserFactory.get({ mail: $scope.mail }, function(data) {
        User.connection(data);
        $rootScope.user = JSON.parse(localStorage.getItem('user'));
      }, function(error) {
        $scope.resultat = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
        console.log("Une erreur est survenue!");
      });
      
    };
  };

  $scope.getAllUser = function() {
   var users = UserFactory.get();
   if (users) {
     $scope.listUser=users;
   }
   else {
     console.log("Erreur");
   }
  };

  $scope.basculerStatus = function(_mail, _role) {
    var b = {};
    b.role = _role;
    console.log(b);
    UserFactory.update({mail: _mail}, b, function() {
      $scope.resultatBascule = `<div class="alert alert-success" role="alert">"Les changements ont bien été pris en compte!"</div>`;
     }, function(error) {
       console.log(error);
      $scope.resultatBascule = `<div class="alert alert-warning" role="alert">${error.data.error}</div>`;
     });
  }

  $scope.logout = function() {
    User.deconnection();
  }

  //Vérifie si un objet est vide ou non
$scope.isObjectUndefined = function(obj){
  if(typeof obj === 'undefined') {
    return true;
  }
  return false;
};
});


/**
 * Routing
 */
myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/compteCree', {
    templateUrl: 'views/public/compteCree.html',
    controller: 'myAppController'
  })
  .when('/', {
      templateUrl: 'views/public/presentation.html',
      controller: 'myAppController'
  })
  .when('/login', {
      templateUrl: 'views/public/login.html',
      controller: 'myAppController'
  })
  .when('/creer', {
      templateUrl: 'views/public/creerCompte.html',
      controller: 'myAppController'
  })
  .when('/poserquestion', {
    templateUrl: 'views/partage/creerMessage.html',
    controller: 'myAppController'
  })
  .when('/questions-réponses', {
    templateUrl: 'views/public/list_messages.html',
    controller: 'myAppController'
  })
  .when('/faq', {
    templateUrl: 'views/public/faq.html',
    controller: 'myAppController'
  })
  .when('/collaborateur/dashboard', {
    templateUrl: 'views/collab/administration.html',
    controller: 'myAppController'
  })
  .when('/collaborateur/liste_utilisateurs', {
    templateUrl: 'views/collab/liste_utilisateurs.html',
    controller: 'myAppController'
  })
  .when('/collaborateur/messages', {
    templateUrl: 'views/collab/list_messages.html',
    controller: 'myAppController'
  })
  .when('/collaborateur/creeroffre', {
    templateUrl: 'views/collab/creerOffre.html',
    controller: 'myAppController'
  })
  .when('/collaborateur/liste_messages_sans_reponses', {
    templateUrl: 'views/collab/list_messages_sans_reponses.html',
    controller: 'myAppController'
  })
  .when('/collaborateur/liste_messages_avec_reponses', {
    templateUrl: 'views/collab/list_messages_avec_reponses.html',
    controller: 'myAppController'
  })
  .when('/panel/offres', {
    templateUrl: 'views/miagiste/list_offres.html',
    controller: 'myAppController'
  })
  .when('/panel/mesquestions', {
    templateUrl: 'views/partage/liste_messages.html',
    controller: 'myAppController'
  })
  .when('/panel/poserquestion', {
    templateUrl:  'views/partage/creerMessage.html',
    controller: 'myAppController'
  })
  .when('/404', {
    templateUrl: 'views/public/404.html',
    controller: 'myAppController'
  })
  $routeProvider.otherwise({redirectTo: '/404'});
}]);

/**
 * Factory et resource
 */

myApp.factory('UserFactory', ['$resource', function($resource) {
  return $resource('/user/:mail', {mail: '@_mail'}, {
    update: {
      method: 'PUT'
    }
  });
}]);


myApp.factory('MessageFactory', ['$resource', function($resource) {
  return $resource('/message/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);

myApp.factory('OffreFactory', ['$resource', function($resource) {
  return $resource('/offre/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);

myApp.factory('FAQFactory', ['$resource', function($resource) {
  return $resource('/faq/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);

/**
 * Service pour l'authentification
 */
myApp.service('User', [function () {
  var user = {};
  return {
    get: function () { return user; },
    connection: function (data) { 
      user.id = data.id;
      user.nom=data.nom;
      user.prenom=data.prenom;
      user.role=data.role;
      user.adresse=data.adresse;
      user.mail=data.mail;
      user.telephone=data.telephone;
      //Variable de gestion de l'authentification
      if (data.role == "collab") {
        user.estCollab = true;
      }
      else if (data.role == "non_miagiste") {
        user.estNon_miagiste=true;
      }
      else {
        user.estMiagiste=true;
      }; 
      user.estConnecte=true;
      localStorage.setItem('user', JSON.stringify(user));
    },
    deconnection: function() {
      user = {};
      localStorage.removeItem('user');
    }
  };
}]);