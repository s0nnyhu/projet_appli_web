var listeMessages = {};
var id = 0;

// Constructeur pour les Positions
function Position (id, id_auteur, contenu, reponse) {
	// l'id unique du message
	this.id = id;
	
	// l'id de l'auteur du message
	this.Id_auteur = id_auteur ;
	 
	// Date et heure du message
	this.Horodatage_msg = new Date ();
	
	// Contenu du message (chaîne de caractères)
	this.Contenu = contenu;
	
	// Réponse au contenu (réponse = message)
	this.Reponse = reponse;
	
	 }
	 
// Constructeur pour les messages
function Message(id, Id_auteur, Contenu, Reponse){
	// La position du message
	this.position = new Position (id, Id_auteur, Contenu, Reponse);
	
	// Ajouter un message
	this.ajouter = function (Contenu) {
		this.position.Contenu = contenu_sous_la_forme_d_une_chaine_de_caracteres;
	}
}

// Créer un nouveau message
var creerMessage = function (Id_auteur, Horodatage_msg, Contenu, Reponse){
	// s'il n'existe pas 
		id++;
		// on le cree
		var msg = new Message (id, Id_auteur, Horodatage_msg, Contenu, Reponse);
		listeMessages[id] = msg;
		return msg;

}

// Exportations des fonctions 
exports.creerMessage = creerMessage;

	