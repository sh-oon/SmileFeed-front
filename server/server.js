require("dotenv").config();
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// express 서버
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});