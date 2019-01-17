const routerApi = require('./router.js');
const express = require('express');
const bodyParser = require('body-parser');//解析,用req.body获取post参数
const app = express();
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api', routerApi);
// app.use(express.static(path.join(__dirname, 'dist')));
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');