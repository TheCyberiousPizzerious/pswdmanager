const loginBtn = document.getElementById("login-btn");//Get the button for logging in
loginBtn.addEventListener('click', login());//adding eventlistener

errM = document.getElementById("error-el");//element for printing error

async function login() {//defining a login() function
    let username = document.getElementById("username").value;//Getting the values of the input elements
    let password = document.getElementById("password").value;

    if (username == '' || password == '') //Checks if the fields are empty
    {
        errM.innerHTML = "Please fill in all the fields"
    } else //If the fields are not empty
    {
        const data = //Makes a object to send
        {
            username: username,
            password: password
        };
        console.log(data);
        const conf = //Make a config object to send
        {
            method: 'POST',//Specify the way to send
            headers: //Headers so info about what is being sent
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Makes the data object to a json object
        };
        console.log(conf);
        const req = await fetch('/api/login', conf);//await response from /api/login
        console.log(req)
        const json = await req.json();// await the req const
        console.log(json)
        if (response.status == 200)//If this message do this
        {
            console.log("User logged in");
            window.location.href = "/download";//Change window location
        }
    }
};