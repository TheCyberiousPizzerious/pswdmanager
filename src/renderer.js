// Getting all the nesecarry elements
const opendbBtn = document.getElementById('opendb-btn');
const errM = document.getElementById("err-p")

//Importing Node modules
const ipcRenderer = require("electron");

opendbBtn.addEventListener('click', async () => {
  ipcRenderer.send('open-file'); //Send request
  ipcRenderer.on('file-selected',(event, filePath) => {
    const dbPath = filePath; // Getting the first item in a array since the function returns a array
    console.log("Selected file: ", dbPath);
    //Check if the file selected is a .db file
    if (dbPath && dbPath.toLowerCase().endsWith('.db')) { // Checks if it is valid
      console.log(dbPath, " checked and it is .db");
      localStorage.setItem("openDBPath", dbPath); // Store for later extraction
      window.href = 'opendb.html'; // Change window to open the db
    } else {
      console.log('Auda, The file selected is not a valid file, make sure that files end in .db');
      errM.innerHTML = "The file selected is not a valid file. Make sure that the file is a .db file";
    }
  });
  ipcRenderer.on('save-canceled', (err) => {
    console.error(err);
  })
});
