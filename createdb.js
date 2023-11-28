const { ipcRenderer } = require('electron');

const continueBtn = document.getElementById("Continue-button");
const goBackBtn = document.getElementById("Go-Back-button");
const cancelBtn = document.getElementById("Cancel-button")

let newDBNavn = document.getElementById("newdb-navn");
let newDBBeskrivelse = document.getElementById("newdb-beskrivelse");
let newdbPassord = document.getElementById("newdb-password");
let passwordCheck = document.getElementById("newdb-password-check");
let errM = document.getElementById("error-p");

console.log("Navnet:" + newDBNavn + "og beskrivelsen:" + newDBBeskrivelse)

function pwdCheck() {
    if (newdbPassord != passwordCheck) {
        errM.innerHTML("The password do not match")
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

}

// Her må ting lagres i localstorage eller lage en tmp fil eller noe

// Jeg må bruke en funksjon
// Hvordan skal jeg lagre dette
// Jeg må ha en onclick function her hvor jeg lager alle elementenne sammen med
// at jeg bytter til en ny side


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