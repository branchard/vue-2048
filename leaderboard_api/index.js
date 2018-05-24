var express = require('express');
var app = express();

var database = require('./database');

database = new database();

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.post('/add', function(req, res) {
    let name = req.query.name;
    let score = req.query.score;
    let time = req.query.time;
    database.add(name, score, time);
    res.json({'name':name, 'score':score, 'time':time, 'status':true});
});

app.get('/all_score', function(req, res) {
    database.getAllScore(function(response) {
        res.json(response);
    });
});

  app.listen(3000);

