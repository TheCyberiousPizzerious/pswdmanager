lage bruker information database 
lage passord database

Hvordan skal databasen virke
    Du åpner programmet 
    den ber om navn på databasen
    passordet til databasen 
    hvordan lagrer jeg trenger noen rows det blir 
        brukernavn passord og mailen du bruker hvor passord blir key kanskje



jeg må enten endre side for newdb eller endre med css og js

RENDERER ER BASICALLY DER DU SCRIVER FRONEND JAVASCRIPTEN DIN




Laste ned fra hjemme maskinen
- [ ] lage en database
- [ ] åpne en database


En løsning
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(':memory:');

const users = ['Sara', 'Mike', 'James', 'David', 'Emily'];

db.serialize(function() {
  db.run('CREATE TABLE mytable (id, name)');
});

db.close();

function insertData() {
  var insertQuery = db.prepare('INSERT INTO mytable VALUES (?,?)');
  for (var i = 0; i < users.length; i++) {
    insertQuery.run(i, users[i]);
    console.log('Data inserted successfully...');
  }
  insertQuery.finalize();
}

function accessData() {
  db.each('SELECT * FROM mytable', function(err, row) {
    if (error) return console.log(err.message);
    console.log(row.id + ': ' + row.name);
  });
}

function deleteData(name) {
  db.run('DELETE FROM mytable WHERE name=?', name, err => {
    if (err) return console.log(err.message);
    console.log(`${name} deleted successfully...`);
  });
}

db.serialize(function() {
  db.run('CREATE TABLE mytable (id, name)');

  insertData();
  accessData();
  deleteData('James');
});

db.close();




LØSNING NUMMER TO