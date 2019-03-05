var listeUtilisateurs = {};

// Constructeur pour les Positions
function Position(id, role, nom, prenom, adresse, mail, tel) {
  this.id = id
	this.role = role;
	this.prenom = prenom;
	this.adresse = adresse;
	this.mail = mail;
	this.tel = tel;
}

// Constructeur pour les Comptes
function Compte(id, role, nom, prenom, adresse, mail, tel) {
  // la position du compte
  this.position = new Position(id, role, nom, prenom, adresse, mail, tel);
  // pour créditer le compte
  this.ajouter = function(somme) {
  	this.position.somme += somme;
  	this.position.date = new Date();
  }
  // pour débiter le compte
  this.retirer = function(somme) {
  	this.position.somme -= somme;
  	this.position.date = new Date();
  }
}

// créer un nouveau compte
var creerCompte = function(id, role, nom, prenom, adresse, mail, tel) {
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined') {
		// on le cree
		listeComptes[id] = new Compte(id, role, nom, prenom, adresse, mail, tel);
		//console.log(listeComptes);
		return 1;
    }
    return 0;
}

// pour créditer un compte existant
var ajouterAuCompte = function(id, somme) {
	//console.log(listeComptes);
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined')
		return 0;
    listeComptes[id].ajouter(somme);
    return 1;
}

// pour débiter un compte existant
var retirerDuCompte = function(id, somme) {
	//console.log(listeComptes);
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined')
		return 0;
    listeComptes[id].retirer(somme);
    return 1;
}

// pour connaitre la position d'un compte existant
var positionDuCompte = function(id) {
	//console.log(listeComptes);
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined')
		return false;
    return listeComptes[id].position;
}

// les 4 fonctions exportées
exports.creerCompte = creerCompte;
exports.ajouterAuCompte = ajouterAuCompte;
exports.retirerDuCompte = retirerDuCompte;
exports.positionDuCompte = positionDuCompte;
