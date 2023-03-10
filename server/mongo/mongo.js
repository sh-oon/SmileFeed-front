const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
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
  userID: {
    type: String,
    default: () => nanoid(10),
    unique: true,
  },
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (email) {
        return User.findOne({email}).exec().then(user => !user);
      },
      message: "Email already exists"
    }
  },
  password: String,
  mobile: String,
  birth: String,
  gender: String,
});


userSchema.pre('save', function (next) {
  let user = this;
  console.log(user);
  User.findOne({ email: user.email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return next(new Error('Email already exists'));
    }
    next();
  });
});

// mongoose 모델
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};