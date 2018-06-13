var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

module.exports = router;
// 接收url
router.get('/send_url', function (req, res) {
    let url = req.query.url;
    req.session.url = url;
    res.send('');
});

// 登录
let user_id;
let user_img;
router.post('/log', function (req, res) {
    req.body.findType = 'exact';
    http.post('127.0.0.1:3333/users/find', req.body).then(function (data) {
        if (data.length != 0) {
            req.session.user_phone = data[0].user_phone;
            user_id = data[0]._id;
            user_img = data[0].user_img;
            if (req.session.url) {
                res.redirect(req.session.url);
            } else {
                res.redirect('../index.html');
            }
            req.session.url = '';

        } else {
            res.redirect('/modules/login/login.html?isLogin=false')
        }
    })
});

// 登录成功
router.get('/getUser', function (req, res) {
    if (req.session.user_phone && req.session.user_phone != '') {
        res.send({
            user_phone: req.session.user_phone,
            user_id,
            user_img
        });
    }
});

// 退出登录
router.get('/existLogin', function (req, res) {
    req.session.user_phone = '';
    res.send('ok');
});