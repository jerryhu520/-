var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// 注册
router.post('/reg', function (req, res) {
  http.post('127.0.0.1:3333/users/add', req.body).then(function (data) {
    res.redirect('/modules/login/login.html')
  })
});

// 账号已存在
router.post('/isExist', function (req, res) {
  req.body.findType = 'exact';
  http.post('127.0.0.1:3333/users/find', req.body).then(function (data) {
    if (data.length != 0) {
      res.send('isExist')
    } else {
      res.send('cancel')
    }
  })
});

