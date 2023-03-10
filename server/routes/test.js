const express = require("express");
const router = express.Router();
import { response } from "../common.js";
const mongo = require("../mongo/mongo.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  response(res, 200, { message: "테스트 성공" });
});

module.exports = router;
