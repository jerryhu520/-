var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


// 轮播图
router.get('/news_banner', function (req, res) {
  http.post('127.0.0.1:3333/news/find', {}).then(function (data) {
    data = data.slice(0, 6)
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        banner_url: data[i].news_img.split(',')[data[i].news_img.split(',').length - 1],
        news_id: data[i]._id
      });
    }
    res.send(newData)
  })
});

// 六图资讯
router.get('/get_news', function (req, res) {
  http.post('127.0.0.1:3333/news/find', req.body).then(function (data) {
    let newData = [];
    newData = data.slice(data.length - 6, data.length);
    res.send(newData);
  })
});

// 正在热映
router.get('/getBeingFilm', function (req, res) {
  http.post('127.0.0.1:3333/beingFilm/find', { submitType: "findJoin", ref: ['film', ''] }).then(function (data) {
    let beingFilm_nums = data.length;
    let newData = data.slice(0, 8);
    newData.push({ beingFilm_nums });
    res.send(newData);
  })
});

// 即将上映
router.get('/getComingFilm', function (req, res) {
  http.post('127.0.0.1:3333/comingFilm/find', { submitType: "findJoin", ref: ['film', ''] }).then(function (data) {
    let comingFilm_nums = data.length;
    let newData = data.slice(0, 8);
    newData.push({ comingFilm_nums });
    res.send(newData);
  })
});

// 热播电影
router.get('/getHotFilm', function (req, res) {
  http.post('127.0.0.1:3333/hotFilm/find', { submitType: "findJoin", ref: ['film', ''] }).then(function (data) {
    let hotgFilm_nums = data.length;
    let newData = data.slice(0, 7);
    newData.push({ hotgFilm_nums });
    res.send(newData);
  })
});

// 今日票房
router.get('/film', function (req, res) {
  http.post('127.0.0.1:3333/film/find', {}).then(function (data) {
    res.send(data);
  })
});