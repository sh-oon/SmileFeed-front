require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth.js");

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const loginRouter = require('./routes/authrization.js');
const user = require('./routes/user.js');
app.use('/v1/api/auth', loginRouter);
app.use('/v1/api/user', auth, user);



// express 서버
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});