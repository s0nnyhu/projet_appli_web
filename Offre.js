
var listeOffres = {};
var index = 1;

function Offre(id, type, nom_societe, sujet, adresse, mail_contact, telephone_contact) {
    this.id = id;
	this.type = type;
	this.nom_societe = nom_societe;
	this.sujet = sujet;
	this.adresse = adresse;
	this.mail_contact = mail_contact;
	this.telephone_contact = telephone_contact;
}

/**
 * 
 * @param {*} type 
 * @param {*} nom_societe 
 * @param {*} sujet 
 * @param {*} adresse 
 * @param {*} mail_contact 
 * @param {*} telephone_contact 
 * Permet de créer une offre
 */
var creerOffre = function(type, nom_societe, sujet, adresse, mail_contact, telephone_contact) {
	id = index;		
	if (typeof listeOffres[id] === 'undefined') {
		listeOffres[id] = new Offre(id, type, nom_societe, sujet, adresse, mail_contact, telephone_contact);
		index++;
		return 1;
	}
	return 0;
}

/**
 * Permet de récupérer toutes les offres
 */
var getAllOffre = function() {
	return listeOffres;
}

/**
 * 
 * @param {*} id 
 * Permet de récupérer une offre spécifique
 */
var getOffre = function(id) {
	if (typeof listeOffres[id] === 'undefined') {
		return false;
	}
	return listeOffres[id].position;
}

exports.creerOffre = creerOffre;
exports.getAllOffre = getAllOffre;
exports.getOffre = getOffre;