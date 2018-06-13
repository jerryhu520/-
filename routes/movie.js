var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

module.exports = router;

function getFilm(type, country, year, term, data) {
    let newData = [];
    if (type == '' && country == '' && year == '') {
        newData = data;
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].film[0].film_type.indexOf(type) >= 0 && data[i].film[0].film_area.indexOf(country) >= 0 && data[i].film[0].film_time.indexOf(year) >= 0) {
                newData.push(data[i]);
            }
        }
    }
    if (term == '0') {
        return newData;
    } else if (term == '1') {

        for (let i = 0; i < newData.length - 1; i++) {
            for (let j = i + 1; j < newData.length; j++) {
                if (Number(newData[j].film[0].film_time.split('-').join('')) > Number(newData[i].film[0].film_time.split('-').join(''))) {
                    let temp = newData[j];
                    newData[j] = newData[i];
                    newData[i] = temp;
                }
            }
        }

        return newData;
    } else if (term == '2') {
        for (let i = 0; i < newData.length - 1; i++) {
            for (let j = i + 1; j < newData.length; j++) {
                if (Number(newData[j].film[0].film_user_point) > Number(newData[i].film[0].film_user_point)) {
                    let temp = newData[j];
                    newData[j] = newData[i];
                    newData[i] = temp;
                }
            }
        }
        return newData;
    }
}

// 获取正在热映所有电影
router.get('/get_beingFilm', function (req, res) {
    let nowPage = req.query.nowPage;
    let everyPage = req.query.everyPage;

    //进行数据截取
    let startIndex = (nowPage - 1) * everyPage;
    let endIndex = nowPage * everyPage;

    let type = req.query.type;
    let country = req.query.country;
    let year = req.query.year;
    let term = req.query.term;
    http.post('127.0.0.1:3333/beingFilm/find', { submitType: "findJoin", ref: ['film', ''] }).then(function (data) {
        let film_arr = getFilm(type, country, year, term, data);
        res.send({
            nowFilmArr: film_arr.slice(startIndex, endIndex),
            maxPage: Math.ceil(film_arr.length / everyPage)
        });
    })
});

// 获取即将上映所有电影
router.get('/get_comingFilm', function (req, res) {
    let nowPage = req.query.nowPage;
    let everyPage = req.query.everyPage;

    //进行数据截取
    let startIndex = (nowPage - 1) * everyPage;
    let endIndex = nowPage * everyPage;

    let type = req.query.type;
    let country = req.query.country;
    let year = req.query.year;
    let term = req.query.term;
    http.post('127.0.0.1:3333/comingFilm/find', { submitType: "findJoin", ref: ['film', ''] }).then(function (data) {
        let film_arr = getFilm(type, country, year, term, data);
        res.send({
            nowFilmArr: film_arr.slice(startIndex, endIndex),
            maxPage: Math.ceil(film_arr.length / everyPage)
        });
    })
});

// 获取热播所有电影
router.get('/get_hotFilm', function (req, res) {
    let nowPage = req.query.nowPage;
    let everyPage = req.query.everyPage;

    //进行数据截取
    let startIndex = (nowPage - 1) * everyPage;
    let endIndex = nowPage * everyPage;

    let type = req.query.type;
    let country = req.query.country;
    let year = req.query.year;
    let term = req.query.term;
    http.post('127.0.0.1:3333/hotFilm/find', { submitType: "findJoin", ref: ['film', ''] }).then(function (data) {
        let film_arr = getFilm(type, country, year, term, data);
        res.send({
            nowFilmArr: film_arr.slice(startIndex, endIndex),
            maxPage: Math.ceil(film_arr.length / everyPage)
        });
    })
});