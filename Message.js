var listeMessages = {};
var index = 1;

function Message (id, id_auteur, contenu, reponse) {
	this.id = id;
	this.id_auteur = id_auteur ;
	this.horodatage_msg = new Date ();
	this.contenu = contenu;
	this.reponse = reponse;
	this.inFAQ = false;
}
	
/**
 * 
 * @param {*} id_auteur 
 * @param {*} contenu 
 * @param {*} reponse 
 * Permet de créer un nouveau message
 */
var creerMessage = function(id_auteur, contenu, reponse) {
	id = index;		
	if (typeof listeMessages[id] === 'undefined') {
		listeMessages[id] = new Message(id, id_auteur, contenu, reponse);
		console.log(listeMessages[id]);
		index++;
		return id;
	}
	return 0;
}

/**
 * 
 * @param {*} id 
 * Permet de récupérer les messages appartenant à un auteur spécifique via l'id de l'auteur
 */
var getMessageByUser = function(id) {
	var tmp_messages = [];
	var messages= {}
	for (i=1; i < index; i++) {
		if (listeMessages[i].id_auteur == id) {
			tmp_messages.push(listeMessages[i]);
		}
	}
	for (i=0; i<tmp_messages.length; i++) {
		messages[i] = tmp_messages[i];
	}
	return messages;
}

/**
 * 
 * @param {*} id 
 * Permet de récupérer un message selon l'id du message
 */
var getMessage = function(id) {
	if (typeof listeMessages[id] === 'undefined') {
		return false;
	}
	return listeMessages[id];
}

/**
 * 
 * @param {*} id (id du message)
 * @param {*} status (boolean)
 * Permet d'ajouter ou de retirer un message dans la section FAQ
 */
var majFAQ = function(id, status) {
	let message = getMessage(id);
	if (message == 'undefined' || message == null) {
		return 0;
	}
	listeMessages[id].inFAQ = status;
	return 1;
}

/**
 * Permet de récupérer tous les messages
 */
var getAllMessage = function() {
	return listeMessages;
}

 /**
  * 
  * @param {*} id (id d'un message)
  * @param {*} id_new_message (id d'un nouveau message qui a été crée)
  * Permet d'attribuer une réponse à un message
  * Les messages de types réponses ont leur attribut réponse à 0
  */
var donnerReponse = function(id, id_new_message) {
	let message = getMessage(id);
	if (message == 'undefined' || message == null) {
		return 0;
	}
	listeMessages[message.id].reponse = getMessage(id_new_message);
	return 1;
}

// Exportations des fonctions 
exports.creerMessage = creerMessage;
exports.getMessageByUser = getMessageByUser;
exports.getMessage = getMessage;
exports.getAllMessage = getAllMessage;
exports.majFAQ = majFAQ;
exports.donnerReponse = donnerReponse;