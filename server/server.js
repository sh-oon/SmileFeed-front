require("dotenv").config();
const express = require("express");
const http = require("http");
const mongo = require("./mongo/mongo.js");
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/v1/api/login', (req, res) => {
  console.log(req.body);
  res.send('Hello World!');
});

app.post('/v1/api/register', (req, res) => {
  console.log(req.body);
  res.send('Hello World!');
});

// express 서버
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});