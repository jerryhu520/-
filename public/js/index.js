// 更改ip
let ip = 'http://127.0.0.1:3333';

// 发送url
$("#first_a>a").on('click', function () {
    $.get('/login/send_url', { url: location.href }, function () {
    })
})

// 登录成功
$.get('/login/getUser', function (data) {
    if (data) {
        if (data.user_phone.length > 5) {
            $(".welcome").text(`${data.user_phone.slice(0, 5)}…`);
        } else {
            $(".welcome").text(`${data.user_phone}`);
        }
        $("#first_a>a").text('个人中心').attr('href', '#');
        $("#second_a>a").text('退出登录').attr('href', '#');
        if (data.user_img) {
            $("#head_img").attr('src', `${ip}${data.user_img}`);
        } else {
            $("#head_img").attr('src', '../img/avatar.png');
        }

        $("#a_box").css('width', '205px');
    }
});

// 退出登录
$("#second_a>a").on('click', function () {
    $.get('/login/existLogin', function (data) {
        if (data == 'ok') {
            $(".welcome").text("");
            $("#first_a>a").text('登录').attr('href', './modules/login/login.html');
            $("#second_a>a").text('注册').attr('href', './modules/register/register.html');
            $("#head_img").attr('src', `${ip}/img/user_img/avatar.png`);
            $("#a_box").css('width', '135px');
        }
    })
})

/* ------------------------ 轮播图----------------------- */
let banner_arr;
let banner_time;
$.get('/news_banner', function (data) {
    banner_arr = data;
    $("#banner").css({
        'background': `url(${ip}${banner_arr[0].banner_url.split('\\').join('/')})`,
        'background-size': '100%',
        'background-position': 'center -100px'
    });
    $("#banner").attr('href', `./modules/information/information.html?${banner_arr[0].news_id}`)
    banner_time = setInterval(to_right, 5000);
})

let i = 0;
// 向右轮播图
function to_right() {

    $("#banner").fadeOut(300, function () {
        i++;

        if (i == banner_arr.length) {
            i = 0;
        }
        img_circle()
    });
}

// 向左轮播图
function to_left() {

    $("#banner").fadeOut(300, function () {
        if (i == 0) {
            i = banner_arr.length;
        }
        i--;
        img_circle()
    });
}

// 点击向右
$("#to_right").on('click', function () {
    to_right();
})

// 点击向左
$("#to_left").on('click', function () {
    to_left();
})

// 划入划出
$("#banner").hover(function () {
    clearInterval(banner_time);
}, function () {
    banner_time = setInterval(to_right, 5000);
});

// 4个点事件委托
$("#circleBox").delegate(".circle", "click", function () {
    i = $(this).index();
    img_circle();
});

// 刷新页面第一个点为红色
$("#circleBox li").eq(0).css("background-color", "rgb(239, 66, 59)");
// 切换图片，改变小圆点的函数(未用自定义属性)
function img_circle() {
    $("#banner").css({
        'background': `url(${ip}${banner_arr[i].banner_url.split('\\').join('/')})`,
        'background-size': '100%',
        'background-position': 'center -100px'
    });
    $("#banner").attr('href', `./modules/information/information.html?${banner_arr[i].news_id}`);
    $("#banner").fadeIn(300);
    // 图片+四个点
    $("#circleBox li").css("background-color", "white").eq(i).css("background-color", "rgb(239, 66, 59)");
}


/* ----------------------------正在热映--------------------- */
// 正在上映上映AJAX
$.get('/getBeingFilm', function (data) {
    let beingFilm_arr = data.splice(0, 8);
    // 热映电影总量
    $("#beingFilm_nums").text(data[data.length - 1].beingFilm_nums)

    beingFilm(beingFilm_arr);

});
// 渲染热映电影信息
function beingFilm(beingFilm_arr) {
    for (let i = 0; i < beingFilm_arr.length; i++) {
        // 电影id
        let beingFilm_id = beingFilm_arr[i].film[0]._id;

        // 图片
        let beingFilm_url = beingFilm_arr[i].film[0].film_mid_img;

        // 电影名
        let beingFilm_name = beingFilm_arr[i].film[0].film_name;
        if (beingFilm_name.length > 6) {
            beingFilm_name = beingFilm_name.slice(0, 6) + '…';
        }

        // 电影评分
        let beingFilm_point = beingFilm_arr[i].film[0].film_user_point;
        $("#hot_img>figure>a>p>span:last-child").eq(i).text(beingFilm_point);

        $("#hot_img").append(`
                    <figure class="blue_box">
                        <a href="../modules/details/details.html?${beingFilm_id}">
                            <img src=${ip}${beingFilm_url} alt="">
                            <i class="blue_label_3 blue_label"></i>
                            <p class="movie_name">
                                <span>${beingFilm_name}</span>
                                <span>${beingFilm_point}</span>
                            </p>
                        </a>
                        <figcaption>
                            <a href="">购票</a>
                        </figcaption>
                    </figure>
        `)
    }

}

/* ------------------------------ 即将上映 --------------------------------- */
// 获取即将上映AJAX
$.get('/getComingFilm', function (data) {
    let comingFilm_arr = data.splice(0, 8);

    // 热映电影总量
    $("#comingFilm_nums").text(data[data.length - 1].comingFilm_nums);

    comingFilm(comingFilm_arr);

});
// 渲染即将上映电影信息
function comingFilm(comingFilm_arr) {
    for (let i = 0; i < comingFilm_arr.length; i++) {

        // 电影id
        let comingFilm_id = comingFilm_arr[i].film[0]._id;

        // 电影名
        let comingFilm_name = comingFilm_arr[i].film[0].film_name;
        if (comingFilm_name.length > 6) {
            comingFilm_name = comingFilm_name.slice(0, 6) + '…';
        }

        // 图片
        let comingFilm_url = comingFilm_arr[i].film[0].film_mid_img;

        // 想看人数
        let comingFilm_want = comingFilm_arr[i].film[0].film_want + '人想看';

        // 上映时间
        let comingFilm_date = comingFilm_arr[i].film[0].film_time;
        comingFilm_date = comingFilm_date.slice(5, 7) + '月' + comingFilm_date.slice(8, 10) + '日上映';
        $("#future_img").append(`
                    <figure class="blue_box">
                        <a href="../modules/details/details.html?${comingFilm_id}">
                            <img src=${ip}${comingFilm_url} alt="">
                            <i class="blue_label_1 blue_label"></i>
                            <span class="movie_name">${comingFilm_name}</span>
                        </a>
                        <figcaption>
                            <span>${comingFilm_want}</span>
                            <div>
                                <a href="">预告片</a>
                                <i></i>
                                <a href="">预&nbsp;&nbsp;售</a>
                            </div>
                            <span>${comingFilm_date}</span>
                        </figcaption>
                    </figure>
        `)
    }

}

/* ------------------------------热播电影----------------------- */
// 获取热播电影AJAX
$.get('/getHotFilm', function (data) {
    let hotFilm_arr = data.splice(0, 7);

    hotFilm(hotFilm_arr);

});
// 渲染热播电影信息
function hotFilm(hotFilm_arr) {
    for (let i = 0; i < hotFilm_arr.length; i++) {

        // 电影id
        let hotFilm_id = hotFilm_arr[i].film[0]._id;

        // 电影名
        let hotFilm_name = hotFilm_arr[i].film[0].film_name;

        // 图片
        let hotFilm_url = hotFilm_arr[i].film[0].film_mid_img;

        // 评分
        let hotFilm_point = hotFilm_arr[i].film[0].film_user_point;

        $("#hot_movie_img").append(`
                    <a class="blue_box" href="../modules/details/details.html?${hotFilm_id}">
                        <img src=${ip}${hotFilm_url} alt="" />
                        <i class="blue_label blue_label_1"></i>
                        <p class="movie_name_b">
                            <span>${hotFilm_name}</span>
                            <span>${hotFilm_point}</span>
                        </p>
                    </a>
        `)
    }

}

/* ---------------------------获取总电影 ------------------------ */
$.get('/film', function (data) {
    let film_arr = data;

    ticket_sort(film_arr);
    want_sort(film_arr);
    top100_sort(film_arr);
})

/* --------------------- 今日票房------------------------- */


function ticket_sort(film_arr) {
    // 排序
    for (let k = 0; k < film_arr.length; k++) {
        if (film_arr[k].film_ticket.indexOf('万') >= 0) {
            film_arr[k].film_ticket = parseInt(film_arr[k].film_ticket) / 10000 + '亿'
        }
    }

    for (let i = 0; i < film_arr.length - 1; i++) {
        for (let j = i + 1; j < film_arr.length; j++) {
            if (parseInt(film_arr[j].film_ticket) > parseInt(film_arr[i].film_ticket)) {
                let temp = film_arr[j];
                film_arr[j] = film_arr[i];
                film_arr[i] = temp;
            }
        }
    }



    let ticket_arr = film_arr.slice(0, 10);

    // 第一名
    $("#ticket_t").html(`
                <a href=../modules/details/details.html?${ticket_arr[0]._id}>
                    <img src=${ip}${ticket_arr[0].film_min_img} alt="">
                    <i class="cup_1 cup"></i>
                </a>
                <a href=../modules/details/details.html?${ticket_arr[0]._id}>
                    <h3>${ticket_arr[0].film_name}</h3>
                    <span>${ticket_arr[0].film_ticket}</span>
                </a>
    `)

    // 排名
    for (let i = 1; i < ticket_arr.length; i++) {
        $("#ticket_list").append(`
                    <li>
                        <a href=../modules/details/details.html?${ticket_arr[i]._id}>
                            <div>
                                <span>${i + 1}</span>
                                <h3>${ticket_arr[i].film_name}</h3>
                            </div>
                            <span>${ticket_arr[i].film_ticket}</span>
                        </a>
                    </li>
        `)
    }
}
/* ------------------------------时间 ---------------------------------- */
setInterval(function () {
    let date = new Date();
    let time;
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    time = hour + ':' + min + ':' + sec;
    $("#time").html(`北京时间 ${time}`);
}, 500)


/* -------------------------- 最受期待 ------------------------ */
function want_sort(film_arr) {
    // 排序
    for (let i = 0; i < film_arr.length - 1; i++) {
        for (let j = i + 1; j < film_arr.length; j++) {
            if (parseInt(film_arr[j].film_want) > parseInt(film_arr[i].film_want)) {
                let temp = film_arr[j];
                film_arr[j] = film_arr[i];
                film_arr[i] = temp;
            }
        }
    }

    let want_arr = film_arr.slice(0, 10);
    // 第一名
    $("#hope_movie_top1").html(`
                <a href=../modules/details/details.html?${want_arr[0]._id}>
                    <img src=${ip}${want_arr[0].film_mid_img} alt="">
                    <i class="cup cup_2"></i>
                </a>
                <a href=../modules/details/details.html?${want_arr[0]._id}>
                    <h3>${want_arr[0].film_name}</h3>
                    <span>上映时间：${want_arr[0].film_time.slice(0, 4)}</span>
                    <span class="want">${want_arr[0].film_want}人想看</span>
                </a>
    `)
    // 第二、第三名
    for (let i = 1; i < 3; i++) {
        if (want_arr[i].film_name.length > 8) {
            want_arr[i].film_name = want_arr[i].film_name.slice(0, 9) + '…';
        }
        $("#hope_movie_top2_3").append(`
                    <a href=../modules/details/details.html?${want_arr[i]._id}>
                        <img src=${ip}${want_arr[i].film_mid_img} alt="">
                        <h3>${want_arr[i].film_name}</h3>
                        <span class="want">${want_arr[i].film_want}人想看</span>
                        <i class="cup_3">${i + 1}</i>
                    </a>
        `)
    }
    // 排名
    for (let j = 3; j < want_arr.length; j++) {
        $("#hope_movie_list").append(`
                    <li>
                        <a href=../modules/details/details.html?${want_arr[j]._id}>
                            <div>
                                <span>${j + 1}</span>
                                <h3>${want_arr[j].film_name}</h3>
                            </div>
                            <span>${want_arr[j].film_want}人想看</span>
                        </a>
                    </li>
        `)
    }
}

/* ------------------------------ TOP100 -------------------------- */
function top100_sort(film_arr) {
    // 排序
    for (let i = 0; i < film_arr.length - 1; i++) {
        for (let j = i + 1; j < film_arr.length; j++) {
            if (Number(film_arr[j].film_user_point) > Number(film_arr[i].film_user_point)) {
                let temp = film_arr[j];
                film_arr[j] = film_arr[i];
                film_arr[i] = temp;
            }
        }
    }

    let top100_arr = film_arr.slice(0, 10);


    // 第一名
    $("#ticket_b").html(`
                <a href=../modules/details/details.html?${top100_arr[0]._id}>
                    <img src=${ip}${top100_arr[0].film_min_img} alt="">
                    <i class="cup cup_5"></i>
                </a>
                <a href=../modules/details/details.html?${top100_arr[0]._id}>
                    <h3>${top100_arr[0].film_name}</h3>
                    <span>${top100_arr[0].film_user_point}分</span>
                </a>
    `)

    // 排名
    for (let i = 1; i < top100_arr.length; i++) {
        $("#ticket_b_list").append(`
                    <li>
                        <a href=../modules/details/details.html?${top100_arr[i]._id}>
                            <div>
                                <span>${i + 1}</span>
                                <h3>${top100_arr[i].film_name}</h3>
                            </div>
                            <span>${top100_arr[i].film_user_point}分</span>
                        </a>
                    </li>
        `)
    }
}