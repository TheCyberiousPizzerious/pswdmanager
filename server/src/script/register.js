const registerBtn = document.getElementById("register-btn");// Define the button element
registerBtn.addEventListener('click', register());//create eventlistener

const errM = document.getElementById("error-el");

async function register() {//defining register function
    let username = document.getElementById("username").value;//
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;

    console.log(
        username,
        password,
        email
    );

    if (username == '' || password == '' || email == '') 
    {
        errM.innerHTML = "Please fill in all the fields!";
    } else 
    {
        const data = 
        {
            username: username,
            password: password,
            email: email
        };
        console.log(data);
        const conf = 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        console.log(conf);
        const req = await fetch('/api/register', conf);
        console.log(res);
        const json = await req.json();
        console.log(json);
        if (response.status == 500)
        {
            console.error("response: ", 500);
        } else if (response.status == 200)
        {
            console.log("response: ", 200, " user created");
            window.location.href="/login"
        } else
        {
            errM.innerHTML = "Something went wrong";
        }
    }
};