const mongoose = require("mongoose");
require("dotenv").config();

// mongoose 연결
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// mongoose 연결 확인
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});

// mongoose 스키마
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String,
  birth: String,
  gender: String,
});

// mongoose 모델
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};