var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

module.exports = router;

// 获取资讯
router.get('/get_news', function (req, res) {
    http.post('127.0.0.1:3333/news/find', { _id: req.query.news_id, findType: 'exact' }).then(function (data) {
        res.send(data);
    })
});

// 相关电影
router.get('/film', function (req, res) {
    http.post('127.0.0.1:3333/film/find', {}).then(function (data) {
        let newData = [];
        for (let i = 0; i < data.length; i++) {
            let index = parseInt(Math.random() * data.length - 1);
            if (newData.length <= 1) {
                newData.push(data[index]);
            }
        }
        res.send(newData);
    })
});

// 存评论
router.get('/save_comment', function (req, res) {
    http.post('127.0.0.1:3333/news_comment/add', {
        user_id: req.query.user_id,
        user_name: req.query.user_name,
        time: req.query.time,
        news_id: req.query.news_id,
        comment: req.query.comment,
        user_img: req.query.user_img
    }).then(function (data) {
        res.send(data);
    })
});


// 取评论
router.get('/get_comment', function (req, res) {
    http.post('127.0.0.1:3333/news_comment/find', { news_id: req.query.news_id }).then(function (data) {
        res.send(data);
    })
});