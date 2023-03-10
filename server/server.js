require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongo = require("./mongo/mongo.js");

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const loginRouter = require('./routes/auth.js');
app.use('/v1/api/auth', loginRouter);

app.get('/v1/api/valid/email', (req, res) => {
  // 이메일 중복 확인
  console.log(req.body);
  
})



// express 서버
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});