var sqlite3 = require('sqlite3').verbose();
var db = null;

function database (){
     db = new sqlite3.Database('./leaderboard.db');
}

database.prototype.add = function add (name, score, time){
    var stmt = db.prepare("INSERT INTO score (name, score, time) VALUES (?, ?, ?)");
    stmt.run(name, score, time);
    stmt.finalize();
}

database.prototype.getAllScore = function getAllScore (callback){
    db.all("SELECT name, score, time FROM score ORDER BY score DESC", function(err, rows) {
            callback(rows);
	});
}

database.prototype.getTopTen = function getTopTen (callback){
    db.all("SELECT name, score, time FROM score ORDER BY score DESC LIMIT 10", function(err, rows) {
            callback(rows);
	});
}

module.exports = database;