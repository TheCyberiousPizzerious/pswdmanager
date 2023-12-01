const { ipcRenderer } = require('electron');

const continueBtn = document.getElementById("Continue-button");
//continueBtn.addEventListener('click', main())
const goBackBtn = document.getElementById("Go-Back-button");
const cancelBtn = document.getElementById("Cancel-button")

let newDBBeskrivelse = document.getElementById("newdb-beskrivelse").value;
let errM = document.getElementById("error-p");



continueBtn.addEventListener('click', async () => {
  let newdbPassord = document.getElementById("newdb-password").value;
  let passwordCheck = document.getElementById("newdb-password-check").value
  let newDBNavn = document.getElementById("newdb-navn").value;
 
  console.log("Navnet:" + newDBNavn + "og beskrivelsen:" + newDBBeskrivelse)
    if (newDBNavn == '' || newdbPassord == '' || passwordCheck == '') {
      errM.innerHTML = "Please fill inn all the required fields";
      errorAnimation() // Kanskje dette også må await(es)
    } else {
        if (newdbPassord != passwordCheck) {
          errM.innerHTML = "The passwords do not match";
        } else {
            localStorage.setItem("newDBNavn", newDBNavn,"newDBBeskrivelse", newDBBeskrivelse,"newDBPassord", newdbPassord)
          try {
            const response = await ipcRenderer.invoke('create-database', localStorage.getItem("newDBnavn"));
            console.log(response);
          } catch (error) {
            console.error('Error creating database:', error);
          }
        }
      }
}) 

function errorAnimation() {
  let input = document.getElementsByClassName('newdb-req-input');
  input.classList.add('fade-out-animation');

  setTimeout(() => {
    input.classList.remove('fade-out-animation');
  }, 2000);
}


// Her må ting lagres i localstorage eller lage en tmp fil eller noe

// Jeg må bruke en funksjon
// Hvordan skal jeg lagre dette
// Jeg må ha en onclick function her hvor jeg lager alle elementenne sammen med
// at jeg bytter til en ny side

// Kanskje dette er den jeg burde bruke

// Provided vet ikke om noe av dette virker


//document.getElementById('createdb-btn').addEventListener('click', async () => {
//  try {
//    // Sending bing bing bing
//    const response = await ipcRenderer.invoke('create-database', 'mydatabase');
//
//    // Ring ding ding recieved
//    console.log(response);
//  } catch (error) {
//    console.error('Error creating database:', error);
//  }
//});