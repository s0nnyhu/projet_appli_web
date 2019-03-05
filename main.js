var express = require('express');
var app = express();

var publicDir = require('path').join(__dirname,'/public');


app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.htm');
});

app.use(express.static(publicDir));

app.listen(3000, function() {
    console.log('Server running on port 3000')
});