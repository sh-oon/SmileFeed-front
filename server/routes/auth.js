const express = require('express');
const router = express.Router();
import { response } from '../common.js';
const mongo = require('../mongo/mongo.js');

router.post('/login', (req, res) => {
  console.log(req.body);
  response(res, 200, { message: "Hello world" });
})

router.post('/register', (req, res) => {
  let userData = req.body
  const user = new mongo.User({
    email: userData.email,
    password: userData.password,
    name: userData.name,
    mobile: userData.mobile,
    birth: userData.birth,
    gender: userData.gender
  });

  user.save()
  .then((result) => {
    console.log('success register', result);
    response(res, 200, { message: "회원가입 성공"});
  })
  .catch((err) => {
    console.log('error register', err);
    response(res, 404, { message: "회원가입 실패" })
  })
})

module.exports = router;