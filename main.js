var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('./User');



app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());


User.creerCompte("miagiste", "Camps", "Paul", "40 rue du pont", "paul@google.fr", "089889999");
User.creerCompte("collab", "Tesssier", "Paul", "40 rue du pont", "tessier@google.fr", "089889999");

app.post('/user/', function (req, res) {
        //console.log(req.body);
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
                //var user = banque.getUser(req.body.id);
                /*if(user) {
                        console.log(user);
                        res.json(user);
                } else {
                        res.status(404).json({ error: "L'utilisateur ayant pour id: "+req.params.id+" n'existe pas." });
                }*/
        } else {
                res.status(409).json({ error: "L'utilisateur ayant pour id: "+req.body.id+" existe déjà." });
        }
});

app.get('/user/:id', function(req, res) {

    console.log(req.query);
    if(typeof req.params.id === 'undefined') {
            res.status(400).json({ error: 'Il faut préciser les paramètres.' });
    } else {
            var user = User.getUser(req.params.id);
            if(user) {
                    console.log(user);
                    res.json(user);
            } else {
                    res.status(404).json({ error: "L'utilisateur ayant pour id: "+req.params.id+" n'existe pas." });
            }
    }
});

app.put('/user/:id', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        console.log(req.query);
        if(typeof req.params.id === 'undefined') {
                res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else {
                console.log(req.body.role);
                if(User.modifierProfil(req.params.id, req.body.role)) {
                        var user = User.getUser(req.params.id);
                        if(user) {
                                console.log(user);
                                res.json(user);
                        } else {
                                res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
                        }
                  } else {
                        res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
                  }
        }
});

app.listen(3000, function () {
console.log('Example app listening on port 3000!') ;
}) ;
