const express = require("express");
//const path = require("path");
const app = express();
const port = 8008;

//app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/html/server.html")
});

app.get("/download", (req, res) => {
  res.sendFile(__dirname + "/html/download.html")
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/html/docs.html")
});

app.get("/faq", (req, res) => {
  res.sendFile(__dirname + "/html/faq.html")
});

app.get("/team", (req, res) => {
  res.sendFile(__dirname + "/html/team.html")
});

app.listen(port, () => {
  console.log('server is running on port:' + port);
})

// Shitten virker ikke fiks det din kjøttpøkk

//app.use('/server', express.static(path.join(__dirname + '/server')));
app.use(express.static('src'))