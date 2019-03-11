var express = require('express') ; // import module express
var bodyParser = require('body-parser'); // import module body-parser 
var Message = require('./Message'); // import module Message
var app = express() ;
app.use(bodyParser.json()); // inclusion du plugin pour parser du JSON

// .../Message/public (physique) = / (url) app.use(express.static(__dirname + '/public'));
// on choisit maintenant d’exposer un 2eme repertoire
// .../Message/bower_components (physique) = /bower_components (url)
app.use('/bower_components',
express.static(__dirname + '/bower_components'));


// Création des données
Message.creerMessage (5, 7, "Bonjour", "Aurevoir");

// Récupération des données
app.get('/Messages/Message/:id', function (req,res) {					
		res.json(Message.positionDuMessage(req.params.id))});		//On récupère le compte d'id .... grâce à la fonction PositionDuCompte qui a param l'id


app.post('/Messages/Message/', function(req, res) {

		var msg = Message.creerMessage(req.body.Id_auteur, req.body.Horodatage_msg, req.body.Contenu, req.body.Reponse);
		res.json(msg);
});

app.listen(3000, function() {									// Affichage
	console.log('Example app listening on port 3000 !')});