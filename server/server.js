const express = require("express");
//const path = require("path"); 
const app = express();
const port = 8008;
const filePath = path.join(__dirname, 'Files', '')


app.post("/fileDownload", (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename=');
  res.setHeader('Content-Type', 'text/plain');

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});


//app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/html/server.html")
});

app.get("/download", (req, res) => {
  res.sendFile(__dirname + "/src/html/download.html")
    res.setHeader('Content-Disposition', 'attachment; filename=example.txt');
    res.setHeader('Content-Type', 'text/plain');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/src/html/docs.html")
});

app.get("/faq", (req, res) => {
  res.sendFile(__dirname + "/src/html/faq.html")
});

app.get("/team", (req, res) => {
  res.sendFile(__dirname + "/src/html/team.html")
});

app.listen(port, () => {
  console.log('server is running on port: ' + port);
})

// Shitten virker ikke fiks det din kjøttpøkk

//app.use('/server', express.static(path.join(__dirname + '/server')));
app.use(express.static('src'))