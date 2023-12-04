openSelected() // Opening the query and printing (not yet tho)
// Node modules import
const { app } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Importing elements from the DOM
const insertDBRow = document.getElementById("new-row-el")

function getLocalPath() {
  const storedDBPath = localStorage.getItem("openDBPath");
  return storedDBPath;
};

function openSelected() {
  const storedDBPath = localStorage.getItem("openDBPath")
  //localStorage.clear() // Hvordan 
  const db = new sqlite3.Database(storedDBPath); // New sqlite instance
  const query = `SELECT * FROM password`; // Defining the query
  db.all(query, (err, rows) => { // Actually doing the query
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(rows) // Dette er alt den innheneter så trenger noe "for" loop
  });
  db.close()
};
insertDBRow.addEventListener('click', () => {

});

const data = { // Need getLocalPath
  dbPath: '/path/to/your/database.db', // Replace with the actual path to your database
  Tittel: 'Sample Title',
  Brukernavn: 'Sample Username',
  Passord: 'Secret Password',
  URL: 'http://example.com',
  Notater: 'Sample Notes',
  Dato: '2023-11-18',
  Endret: '2023-11-18',
};

  // Send an IPC message to insert data

console.log(result);

//main
  
const db = new sqlite3.Database(data.dbPath);
// Insert data into the table
const insertQuery = `INSERT INTO password (Tittel, Brukernavn, Password, URL, Notes, Dato, Endret) VALUES (?, ?, ?, ?, ?, ?)`;

const insertValues = [data.Tittel, data.Brukernavn, data.URL, data.Notes, data.Dato, data.Endret];

db.run(insertQuery, insertValues, function (err) {
  if (err) {
    return `Error inserting data: ${err.message}`;
  }
  return `Data inserted successfully with ID: ${this.lastID}`;
});
db.close();
//preload