const { ipcRenderer } = require('electron');

const continueBtn = document.getElementById("Continue-button");
continueBtn.addEventListener('click', main())
const goBackBtn = document.getElementById("Go-Back-button");
const cancelBtn = document.getElementById("Cancel-button")

let newDBNavn = document.getElementById("newdb-navn").value;
let newDBBeskrivelse = document.getElementById("newdb-beskrivelse").value;
let newdbPassord = document.getElementById("newdb-password").value;
let passwordCheck = document.getElementById("newdb-password-check").value;
let errM = document.getElementById("error-p").value;

console.log("Navnet:" + newDBNavn + "og beskrivelsen:" + newDBBeskrivelse)

function pwdCheck() {
    if (newdbPassord != passwordCheck) {
        errM.innerHTML("The password do not match")
    } else {
      jsonStore()
    }
}

function jsonStore() {
    localStorage.setItem(
        "newDBNavn", newDBNavn,
        "newDBBeskrivelse", newDBBeskrivelse,
        "newDBPassord", newdbPassord
    );
}

function main() {
  pwdCheck();
  createDBFunction()
}

// Her må ting lagres i localstorage eller lage en tmp fil eller noe

// Jeg må bruke en funksjon
// Hvordan skal jeg lagre dette
// Jeg må ha en onclick function her hvor jeg lager alle elementenne sammen med
// at jeg bytter til en ny side

// Kanskje dette er den jeg burde bruke
async function createDBFunction() {
  try {
    const response = await ipcRenderer.invoke('create-database', localStorage.getItem("newDBnavn"));
    console.log(response);
  } catch (error) {
    console.error('Error creating database:', error);
  }
};

// Provided vet ikke om noe av dette virker
document.getElementById('createdb-btn').addEventListener('click', async () => {
  try {
    // Sending bing bing bing
    const response = await ipcRenderer.invoke('create-database', 'mydatabase');

    // Ring ding ding recieved
    console.log(response);
  } catch (error) {
    console.error('Error creating database:', error);
  }
});