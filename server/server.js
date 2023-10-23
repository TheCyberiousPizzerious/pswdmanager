const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/data", (req, res) => {
  const receivedData = req.body;
  console.log("Received data: ", receivedData);
  res.send("Data received successfully");
});

app.listen(port, () => {
  console.log("server is running on port: ${port}");
})