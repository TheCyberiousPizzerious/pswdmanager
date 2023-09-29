// generates a random key
async function generateKey() {
    return await window.crypto.subtle.generateKey(
        {   // try different names sometime
            name: "AES-GCM",
            lenght: "256"
        },
        true, ["encrypt", "decrpyt"]
    );
}

// Function to encrypt a string
async function encryptString(key, plaintext) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext); // Trye Uint16Array sometime
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96 bit IV
    const ciphertext = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: iv
    },
        key, data
    );
    return { iv: iv, ciphertext: new Uint8Array(plaintext) };
}

// Function to decrypt a cyphertext
async function decryptString(key, {iv, ciphertext}) {
    const decrtedData = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key, ciphertext
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
}

// Main function
async function main() {
    //generate random key
    const key = await generateKey();

    //string for encryption
    const plaintext = "Hello, Web crypto API!";

    //Encrypting
    const encryptedData = await encryptString(key, plaintext);

    //Making sure
    console.log("Kryptert dritt: ", encryptedData);

    //Decrypt the data
    const decryptedText = await decryptString(key, encryptedData);

    console.log("Dekryptert tekst: ", decryptedText);
}