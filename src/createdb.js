// Getting in all the elements
const continueBtn = document.getElementById("Continue-button");

// Elements for showing errormessages
let errM = document.getElementById("error-p");

// Getting all the Modules that i need
//const { remote } = require('electron')
const sqlite3 = require('sqlite3')
//const sqlc = require('sqlcipher') // Cirker 
const path = require('node:path');
const ipcRenderer = require('electron');
//const { errorMonitor } = require('node:events');
//const { fs } = require('fs')

// Ask for main save location dialog
function politeMainAsk() {
  ipcRenderer.send('save-file')
  ipcRenderer.on('location-chosen', (event, filePath) => {
  });
};
// Kind of the main function with anonymous function
continueBtn.addEventListener('click', () => {
  //Import al needed elements
  let newDBBeskrivelse = document.getElementById("newdb-beskrivelse").value;
  let newdbPassord = document.getElementById("newdb-password").value;
  let passwordCheck = document.getElementById("newdb-password-check").value
  let newDBNavn = document.getElementById("newdb-navn").value;
  console.log(
    "Tingene: \n",
    "Beskrivelse: " + newDBBeskrivelse + ",\n",
    "Navn: " + newDBNavn + ",\n",
    "Password: " + newdbPassord + ",\n",
    "Password check: " + passwordCheck
  )
  // Check if any required fields are empty
  if (newDBNavn == '' || newdbPassord == '' || passwordCheck == '') {
    errM.innerHTML = "Please fill inn all the required fields";
  } else {
    if (newdbPassord != passwordCheck) {
      errM.innerHTML = "The passwords do not match";
    } else {
      // here ipcRenderer is needed    
      const dbPath = path.join(__dirname, newDBNavn + '.db'); // Make filename and path
      //Choose filelocation needed

      const db = new sqlite3.Database(dbPath); // Makes a new instance of sqlite3
      const createTableQuery = // Creating Query
        ` 
        CREATE TABLE IF NOT EXISTS password (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Tittel TEXT,
        Brukernavn TEXT,
        Passord TEXT,
        URL TEXT,
        Notes TEXT,
        Dato TEXT,
        Endret TEXT
        );`;
        // SQL command to create the table
      db.run(createTableQuery, (err) => { // run is for queries that return a single row
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table created successfully.');
        }
        db.close(); // Close the database connection
      })
    }
  }
});