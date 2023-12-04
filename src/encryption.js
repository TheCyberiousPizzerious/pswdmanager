// generates a random key
const cryptoJS = require("crypto-js");
const cryptoRandomString = require('crypto-random-string');

function generateEncryptionKey() {
    return cryptoRandomString({ lenght: 32, type: 'base64' });
}

function encryptData(data, key) {
    const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
    return ciphertext;
}

function decryptData(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

const key = generateEncryptionKey();
const plaintext = "bla bla bla bla "

const ciphertext = encryptData(plaintext, key);
console.log("ciphertext", ciphertext);

const decryptedtext = decryptData(ciphertext, key);
console.log("decrypted: ", decryptedtext);

console.log("secret key: ", key);


// http requests and shiii