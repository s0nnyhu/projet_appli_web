
var listeUtilisateurs = {};
var index = 1;

function Compte(id, role, nom, prenom, adresse, mail, tel) {
  this.id = id;
	this.role = role;
	this.nom = nom;
	this.prenom = prenom;
	this.adresse = adresse;
	this.mail = mail;
	this.tel = tel;
}

/**
 * 
 * @param {*} nom 
 * @param {*} prenom 
 * @param {*} adresse 
 * @param {*} mail 
 * @param {*} tel 
 * Permet de créer un compte non miagiste, le rôle attribuer est par défaut non_miagiste
 */
var creerCompteNonMiagiste = function(nom, prenom, adresse, mail, tel) {
	id = index;		
	if (typeof listeUtilisateurs[id] === 'undefined') {
		listeUtilisateurs[id] = new Compte(id, "non_miagiste", nom, prenom, adresse, mail, tel);
		index++;
		return 1;
		
	}
	return 0;
}

/**
 * 
 * @param {*} role 
 * @param {*} nom 
 * @param {*} prenom 
 * @param {*} adresse 
 * @param {*} mail 
 * @param {*} tel 
 * Permet de créer un nouveau compte
 */
var creerCompte = function(role, nom, prenom, adresse, mail, tel) {
	id = index;		
	if (typeof listeUtilisateurs[id] === 'undefined') {
		listeUtilisateurs[id] = new Compte(id, role, nom, prenom, adresse, mail, tel);
		index++;
		return 1;
	}
	return 0;
}

/**
 * 
 * @param {*} email 
 * @param {*} role 
 * Permet de modifier le rôle d'un utilisateur
 */
var modifierProfil = function(email, role) {
	let user = getUserByEmail(email);
	if (user == 'undefined' || user == null) {
		return 0;
	}
	listeUtilisateurs[user.id].role = role;
	return 1;
}

/**
 * 
 * @param {*} id 
 * Permet de récupérer un utilisateur via son id
 */
var getUser = function(id) {
	return listeUtilisateurs[id];
}

/**
 * 
 * @param {*} email 
 * Permet de vérifier si un utilisateur existe déjà, via son email
 */
var existe = function(email) {
	for (i=1; i < index; i++) {
		if (listeUtilisateurs[i].mail == email) {
			return true;
		}
	}
	return false;
}

/**
 * 
 * @param {*} email 
 * Permet de récupérer l'utilisateur via son email
 */
var getUserByEmail = function(email) {
	for (i=1; i < index; i++) {
		if (listeUtilisateurs[i].mail == email) {
			return listeUtilisateurs[i];
		}
	}
	return null;
}

/**
 * Permet de récupérer la liste des utilisateurs
 */
var getAllUser = function() {
	return listeUtilisateurs;
}

exports.modifierProfil = modifierProfil;
exports.getUserByEmail = getUserByEmail;
exports.getUser = getUser;
exports.creerCompte = creerCompte;
exports.creerCompteNonMiagiste = creerCompteNonMiagiste;
exports.existe = existe;
exports.getAllUser = getAllUser;