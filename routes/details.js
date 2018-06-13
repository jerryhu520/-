var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

// 获取匹配的电影
router.get('/get_film', function (req, res) {
    http.post('127.0.0.1:3333/film/find', { _id: req.query.film_id, findType: 'exact' }).then(function (data) {
        res.send(data)
    })
});

// 相关资讯
router.get('/news', function (req, res) {
    http.post('127.0.0.1:3333/news/find', {}).then(function (data) {
        let newData = [];
        for (let i = 0; i < data.length; i++) {
            let index = parseInt(Math.random() * data.length - 1);
            if (newData.indexOf(data[index]) == -1) {
                newData.push(data[index]);
            }
            if (newData.length == 3) {
                break;
            }
        }
        res.send(newData);
    })
});

// 相关电影
router.get('/film', function (req, res) {
    http.post('127.0.0.1:3333/film/find', {}).then(function (data) {
        let newData = [];
        for (let i = 0; i < data.length; i++) {
            let index = parseInt(Math.random() * data.length - 1);
            if (newData.indexOf(data[index]) == -1) {
                newData.push(data[index]);
            }
            if (newData.length == 6) {
                break;
            }
        }
        res.send(newData);
    })
});

// 存评论
router.get('/save_comment', function (req, res) {
    http.post('127.0.0.1:3333/film_comment/add', {
        user_id: req.query.user_id,
        user_name: req.query.user_name,
        time: req.query.time,
        film_id: req.query.film_id,
        comment: req.query.comment,
        user_img: req.query.user_img
    }).then(function (data) {
        res.send(data);
    })
});


// 取评论
router.get('/get_comment', function (req, res) {
    http.post('127.0.0.1:3333/film_comment/find', { film_id: req.query.film_id }).then(function (data) {
        // let newData = [];
        // for (let item of data) {
        //     newData.push(item.comment);
        // }
        res.send(data);
    })
});
module.exports = router;

