var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

// 获取热映
router.get('/get_beingFilm', function (req, res) {
    http.post('127.0.0.1:3333/beingFilm/find', { submitType: "findJoin", ref: ['film', ''] }).then(function (data) {
        res.send(data);
    })
});

// 获取所有电影
router.get('/film', function (req, res) {
    let film_area = '';
    if (req.query.film_area) {
        film_area = req.query.film_area;
    }
    console.log(film_area)
    http.post('127.0.0.1:3333/film/find', { film_area }).then(function (data) {
        res.send(data);
    })
});

module.exports = router;