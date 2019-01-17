const sqlapi = require('./api.js');
const express = require('express');
const router = express.Router();
// 登录
  router.post('/login', (req, res, next) => {
    sqlapi.UserLogin(req,res,next);
  })
// 注册
  router.post('/register', (req, res, next) => {
    sqlapi.UserRegister(req,res,next);
  })
// 获取图片
  router.get('/meizi',(req,res,next) => {
    sqlapi.getimgdata(req,res,next);
  })
  module.exports = router;