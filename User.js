
var listeUtilisateurs = {};
var index = 1;

// Constructeur pour les Comptes
function Compte(id, role, nom, prenom, adresse, mail, tel) {
  this.id = id;
	this.role = role;
	this.nom = nom;
	this.prenom = prenom;
	this.adresse = adresse;
	this.mail = mail;
	this.tel = tel;
}

// créer un nouveau compte
var creerCompteNonMiagiste = function(nom, prenom, adresse, mail, tel) {
	id = index;		
		// s'il n'existe pas
	if (typeof listeUtilisateurs[id] === 'undefined') {
		// on le cree
		listeUtilisateurs[id] = new Compte(id, "non_miagiste", nom, prenom, adresse, mail, tel);
		//console.log(listeComptes);
		console.log(listeUtilisateurs[id]);
		index++;
		return 1;
		
	}
	return 0;
}

// créer un nouveau compte
var creerCompte = function(role, nom, prenom, adresse, mail, tel) {
	id = index;		
		// s'il n'existe pas
	if (typeof listeUtilisateurs[id] === 'undefined') {
		console.log("hello");
		// on le cree
		listeUtilisateurs[id] = new Compte(id, role, nom, prenom, adresse, mail, tel);
		//console.log(listeComptes);
		console.log(listeUtilisateurs[id]);
		index++;
		return 1;
	}
	return 0;
}

var modifierProfil = function(id, role) {
	let user = getUser(id);
	if (user == 'undefined' || user == null) {
		return 0;
	}
	listeUtilisateurs[id].role = role;
	return 1;
}

var getUser = function(id) {
	return listeUtilisateurs[id];
}

var existe = function(email) {
	for (i=1; i < index; i++) {
		if (listeUtilisateurs[i].mail == email) {
			return true;
		}
	}
	return false;
}

var getUserByEmail = function(email) {
	for (i=1; i < index; i++) {
		if (listeUtilisateurs[i].mail == email) {
			return listeUtilisateurs[i];
		}
	}
	return null;
}

exports.modifierProfil = modifierProfil;
exports.getUserByEmail = getUserByEmail;
exports.getUser = getUser;
exports.creerCompte = creerCompte;
exports.creerCompteNonMiagiste = creerCompteNonMiagiste;
exports.existe = existe;