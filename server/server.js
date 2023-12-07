//--------------------------------//
//     * Defining Elements *      //
//--------------------------------//
const express = require("express");
const cjs = require("crypto-js");
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const port = 8008;//What port the server is running on
const address = "10.0.0.16";//Define the ip address
const key = "#)7avwKsEndQdE2pkv^i";//Random key

//--------------------------------//
//        * sql connections *     //
//--------------------------------//

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: ''
});

const sessionConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: ''
};

//--------------------------------//
//       * Session storage *      //
//--------------------------------//

//const storeSession = new MySQLStore(sessionConfig);//New sql instance
//connection.connect();//Connect to the database
//app.use(bodyParser.json());//For parsing json requests
//app.use(session({//sql session info that should be stored
//  key: 'session_cookie',
//  secret: 'session_secret',
//  store: storeSession,
//  resave: false,
//  saveUninitialized: true,
//  cookie: {
//    secure: false,
//    maxAge: 999999//How long the session will last
//  }
//}));

//--------------------------------//
//    * Create post request *     //
//--------------------------------//

app.post('/api/register', (req, res) => {//Request to register user
  console.log("Request to /api/register");
  const ctxt = cjs.AES.encrypt(body.req.password, key).toString();//Encrypt the password
  console.log("Encrypted pwd: ", ctxt);
  console.log("Connection attempt started");
  connection.query(`INSERT INTO users (username, password, email) VALUES (
    ${connection.escape(req.body.username)},
    ${connection.escape(ctxt)},
    ${connection.escape(req.body.email)})`,
    function (err, result, fields) {
      if (err) 
      {
        console.error(err)
        res.status(500).send({err: "username or emmail already in use"});
      } else
        {
          res.status(200).send({message: "User created succesfully"})
          console.log("User created: ", req.body.username)
        }
    });
});

app.post("/api/login", (req, res) => {//Request to login
  console.log("Request to /api/register");
  const ctxt = cjs.AES.encrypt(body.req.password, key).toString();//Encrypt the password
  console.log("Encrypted pwd: ", ctxt);
  console.log("Connection attempt started");
  connection.query(`SELECT * FROM users WHERE username = ${connection.escape(req.body.username)} AND password = ${connection.escape(ctxt)}`,
  function (err, result, fields) {
    if (err) 
    {
      console.error(err);
      res.status(500).send({err: "Something went wrong"});
    } else 
      {
        if (result.lenght > 0)
        {
          console.log(`User ${req.body.username} logged in!`);
          res.status(200).send({message: "Login succes yay!"});
          req.session.logedin = "true";//Create session when logged in
          req.session.username = req.body.username;
          req.session.save();
        } else
          {
            console.error("Wrong pwd or username ", err);
            res.status(401).send({err: "username or password is wrong"});
          }
      }
  });
});

//--------------------------------//
//     * Create get requests *    //
//--------------------------------//

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/download", (req, res) => {
  res.sendFile(__dirname + "/src/html/download.html");
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/src/html/docs.html");
});

app.get("/faq", (req, res) => {
  res.sendFile(__dirname + "/src/html/faq.html");
});

app.get("/team", (req, res) => {
  res.sendFile(__dirname + "/src/html/team.html");
});

app.get("/logout", (req, res) => {
  res.sendFile(__dirname + "/src/html/logout.html");
  req.session.destroy();
});

const set = app.listen(port, address, () => {
  console.log('server is running on: ' + address + ":" + port);
});

console.log(set)
app.use(express.static('src')); // Make so that the user cannot acess anything outside of /src/