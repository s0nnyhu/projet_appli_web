var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('./User');
var Message = require('./Message');
var Offre = require('./Offre');


app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());

User.creerCompte("collab", "Johnny", "Paul", "40 rue du pont", "jhonny@google.fr", "07985599");
User.creerCompte("miagiste", "Gérard", "Cotier", "Oui bravo", "gerard@google.fr", "086767999");
User.creerCompte("miagiste", "Sophie", "Turner", "Maison blanche", "sophie@google.fr", "086767999");
User.creerCompte("miagiste", "Didier", "Paul", "7 rue Lolo", "didier@google.fr", "086767999");
User.creerCompte("non_miagiste", "Patrick", "Wannabe", "Fin fond de l'alaska", "patrick@google.fr", "01898999");
User.creerCompte("non_miagiste", "Claire", "Dupont", "90 avenue laska", "claire@google.fr", "01898999");

Message.creerMessage(1, "Disponible sur le site de l'université", 0);
Message.creerMessage(1, "Plus d'information sur le site de la miage", 0);
Message.creerMessage(2, "Ou se trouve l'emploi du temps?", Message.getMessage(1));
Message.creerMessage(2, "Que signifie MIAGE?", Message.getMessage(2));
Message.creerMessage(3, "Le stage est il obligatoire?", null);
Message.creerMessage(3, "Quelle est la date de la rentrée?", null);
//On met le troisième message crée dans la FAQ
Message.majFAQ(3, true);

Offre.creerOffre("Alternance", "Carrefour", "ALTERNANCE - BOUCHER (H/F)", "Fréjus (83)", "rh@carrefour.fr", "098989111" );
Offre.creerOffre("Alternance", "Volkswagen Group France", "CONSEILLER COMMERCIAL AUTOMOBILE (H/F)", "Toulouse (31)", "rh@das.auto", "+332323411" );
Offre.creerOffre("Stage", "Valeurs Immobilieres", "Stage négociateur/trice immobilier", "Toulouse (31)", "valeruimmo@immo.fr", "023485888" );

/******
 * Utilisateur
 */
app.post('/user/', function (req, res) {
        if(typeof req.body.nom === 'undefined' || typeof req.body.prenom === 'undefined'  || 
            typeof req.body.mail === 'undefined' || 
            typeof req.body.adresse === 'undefined' || typeof req.body.tel === 'undefined'  ) {
                    res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } 
        else if (User.existe(req.body.mail)) {
                res.status(400).json({ error: 'Adresse email existant!'});
        }
        else if(User.creerCompteNonMiagiste(req.body.nom, req.body.prenom, req.body.adresse, req.body.mail, req.body.tel )) {
                res.json(req.body);
        } else {
                res.status(409).json({ error: "L'utilisateur ayant pour id "+req.body.id+" existe déjà." });
        }
});

app.get('/user/:mail', function(req, res) {
    if(typeof req.params.mail === 'undefined') {
            res.status(400).json({ error: 'Il faut préciser les paramètres.' });
    } else {
            var user = User.getUserByEmail(req.params.mail);
            if(user) {
                    res.json(user);
            } else {
                    res.status(404).json({ error: "L'utilisateur ayant pour mail "+req.params.mail+" n'existe pas." });
            }
    }
});

app.put('/user/:mail', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        if(typeof req.params.mail === 'undefined') {
                res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else {
                if(User.modifierProfil(req.params.mail, req.body.role)) {
                        var user = User.getUserByEmail(req.params.mail);
                        if(user) {
                                res.json(user);
                        } else {
                                res.status(404).json({ error: "Le compte de "+req.params.mail+" n'existe pas." });
                        }
                  } else {
                        res.status(404).json({ error: "Le compte de "+req.params.mail+" n'existe pas." });
                  }
        }
});


app.get('/user/', function(req, res) {
        var user = User.getAllUser();
        if(user) {
                res.json(user);
        } else {
                res.status(404).json({ error: "Un problème sur la récupération des utilisateurs est survenue!" });
        }
});

/******
 * Message
 */

app.get('/message/:id', function(req, res) {
        if(typeof req.params.id === 'undefined') {
                res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else {
                var message = Message.getMessageByUser(req.params.id);
                if(message) {
                        res.json(message);
                } else {
                        res.status(404).json({ error: "Message non trouvé" });
                }
        }
});

app.get('/message/', function(req, res) {
        var message = Message.getAllMessage();
        if(message) {
                res.json(message);
        } else {
                res.status(404).json({ error: "Un problème sur la récupération des utilisateurs est survenue!" });
        }
});

app.post('/message/', function (req, res) {
        if(typeof req.body.contenu === 'undefined') {
                    res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } 
        var id_message_cree = Message.creerMessage(req.body.id_auteur, req.body.contenu, req.body.reponse);
        if( id_message_cree != 0) {
                res.json(Message.getMessage(id_message_cree));
        } else {
                res.status(409).json({ error: "Une erreur est survenue, le message n'a pas pu être délivré!" });
        }
});

app.put('/message/:id', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        if(typeof req.params.id === 'undefined') {
                res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else {
                if(Message.donnerReponse(req.params.id, req.body.id) != 0) {
                        var message = Message.getMessage(req.params.id);
                        if(message) {
                                res.json(message);
                        } else {
                                res.status(404).json({ error: "Le message n'a pas été trouvé!" });
                        }
                  } else {
                        res.status(404).json({ error: "Le message n'a pas été trouvé!" });
                  }
        }
});

app.put('/faq/:id', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        if(typeof req.params.id === 'undefined') {
                res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else {
                if(Message.majFAQ(req.params.id, req.body.inFAQ)) {
                        var message = Message.getMessage(req.params.id);
                        if(message) {
                                res.json(message);
                        } else {
                                res.status(404).json({ error: "Le message n'a pas été trouvé!" });
                        }
                  } else {
                        res.status(404).json({ error: "Le message n'a pas été trouvé!" });
                  }
        }
});

/******
 * Offre
*/
app.post('/offre/', function (req, res) {
        if(req.body.type != 'Alternance' || req.body.type != 'Stage'  || typeof req.body.type === 'undefined' || typeof req.body.nom_societe === 'undefined'  || 
            typeof req.body.sujet === 'undefined' || typeof req.body.adresse === 'undefined',
            typeof req.body.mail_contact === 'undefined' || typeof req.body.telephone_contact === 'undefined') {
                    res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } 
        if(Offre.creerOffre(req.body.type, req.body.nom_societe, req.body.sujet, req.body.adresse, req.body.mail_contact, req.body.telephone_contact )) {
                res.json(req.body);
        } else {
                res.status(409).json({ error: "Une erreur est survenue" });
        }
});

app.get('/offre/:id', function(req, res) {
        if(typeof req.params.id === 'undefined') {
                res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else {
                var offre = Offre.getOffre(req.params.id);
                if(offre) {
                        res.json(offre);
                } else {
                        res.status(404).json({ error: "L'offre "+req.params.id+" n'existe pas.'" });
                }
        }
});

app.get('/offre/', function(req, res) {
        var offres = Offre.getAllOffre();
        if(offres) {
                res.json(offres);
        } else {
                res.status(404).json({ error: "Un problème sur la récupération des offres est survenue!" });
        }
});


/*Lancement serveur*/
app.listen(3000, function () {
console.log('Example app listening on port 3000!') ;
}) ;
