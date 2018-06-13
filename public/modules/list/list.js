// 更改ip
let ip = 'http://127.0.0.1:3333';

// 发送url
$("#first_a>a").on('click', function () {
    $.get('/login/send_url', { url: location.href }, function () {

    })
})

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
            $("#head_img").attr('src', '../../img/avatar.png');
        }
        $("#a_box").css('width', '205px');
    }
});

// 退出登录
$("#second_a>a").on('click', function () {
    $.get('/login/existLogin', function (data) {
        if (data == 'ok') {
            $(".welcome").text("");
            $("#first_a>a").text('登录').attr('href', '../login/login.html');
            $("#second_a>a").text('注册').attr('href', '../register/register.html');
            $("#head_img").attr('src', `${ip}/img/user_img/avatar.png`);
            $("#a_box").css('width', '135px');
        }
    })
})


// 获取时间
let date = new Date();
let time;
if (date.getMonth() <= 9) {
    time = date.getFullYear() + '-' + 0;
} else {
    time = date.getFullYear() + '-';
}

time += date.getMonth() + 1 + '-';
time += date.getDate()
$(".date").text(time)

// 灰色条
$(".gray_block_con>li:first-child>.to_top").css('display', 'inline-block');
$(".gray_block_con>li:first-child>a").css('color', 'rgb(239, 66, 59)');
$(".gray_block_con").delegate('li', 'click', function () {
    $(".gray_block_con>li>.to_top").css('display', 'none');
    $(".gray_block_con>li>a").css('color', 'rgb(153, 153, 153)');
    $(this).children('.to_top').css('display', 'inline-block');
    $(this).children('a').css('color', 'rgb(239, 66, 59)');
    let rank = $(this).index();
    switch (rank) {
        case 0:
            $("head>title").html('热映口碑榜 - 猫眼电影 - 一网打尽好电影');
            beingFilm();
            break;
        case 1:
            $("head>title").html('最受期待榜 - 猫眼电影 - 一网打尽好电影');
            want_film();
            break;
        case 2:
            $("head>title").html('国内票房榜 - 猫眼电影 - 一网打尽好电影');
            ticket_film();
            break;
        case 3:
            $("head>title").html('北美票房榜 - 猫眼电影 - 一网打尽好电影');
            ticket_film('美国');
            break;
        case 4:
            $("head>title").html('TOP100榜 - 猫眼电影 - 一网打尽好电影');
            top100_Film();
            break;


    }
})

// 获取热映
beingFilm();
function beingFilm() {
    $.get('/list/get_beingFilm', function (data) {
        let beingFilm_arr = data;
        $("#rule").text('榜单规则：将昨天国内热映的影片，按照评分从高到低依次排列前10名，每天上午10点更新，相关数据来源于“猫眼专业版”及“猫眼电影库”。')
        for (let i = 0; i < beingFilm_arr.length - 1; i++) {
            for (let j = i + 1; j < beingFilm_arr.length; j++) {
                if (Number(beingFilm_arr[j].film[0].film_user_point) > Number(beingFilm_arr[i].film[0].film_user_point)) {
                    let temp = beingFilm_arr[i];
                    beingFilm_arr[i] = beingFilm_arr[j];
                    beingFilm_arr[j] = temp
                }
            }
        }
        let ten_beingFilm_arr = beingFilm_arr.slice(0, 10);

        let str = '';
        for (let k = 0; k < ten_beingFilm_arr.length; k++) {
            let ranking = k + 1;
            if (k == 0) {
                ranking = '';
            }
            str += `
            <div class="list_img_1">
                <i>${ranking}</i>
                <a href="../details/details.html?${ten_beingFilm_arr[k].film[0]._id}"><img src="${ip}${ten_beingFilm_arr[k].film[0].film_mid_img}" alt="${ten_beingFilm_arr[k].film[0].film_name}" /></a>
                <div>
                    <div>
                        <h3>${ten_beingFilm_arr[k].film[0].film_name}</h3>
                        <p>主演：${ten_beingFilm_arr[k].film[0].film_actor}</p>
                        <p>上映时间：${ten_beingFilm_arr[k].film[0].film_time}</p>
                    </div>
                    <p>${ten_beingFilm_arr[k].film[0].film_user_point.slice(0, 2)}<span>${ten_beingFilm_arr[k].film[0].film_user_point.slice(2, 3)}</span></p>
                </div>
            </div>
            `
        }
        $(".list_img").html(str);
    });
}


// 最受期待榜
function want_film() {

    $.get('/list/film', function (data) {
        let film_arr = data;
        $("#rule").text('');
        for (let i = 0; i < film_arr.length - 1; i++) {
            for (let j = i + 1; j < film_arr.length; j++) {
                if (parseInt(film_arr[j].film_want) > parseInt(film_arr[i].film_want)) {
                    let temp = film_arr[i];
                    film_arr[i] = film_arr[j];
                    film_arr[j] = temp
                }
            }
        }
        let ten_wantFilm_arr = film_arr.slice(0, 10);

        let str = '';
        for (let k = 0; k < ten_wantFilm_arr.length; k++) {
            let ranking = k + 1;
            if (k == 0) {
                ranking = '';
            }
            str += `
        <div class="list_img_1">
            <i>${ranking}</i>
            <a href="../details/details.html?${ten_wantFilm_arr[k]._id}"><img src="${ip}${ten_wantFilm_arr[k].film_mid_img}" alt="${ten_wantFilm_arr[k].film_name}" /></a>
            <div>
                <div>
                    <h3>${ten_wantFilm_arr[k].film_name}</h3>
                    <p>主演：${ten_wantFilm_arr[k].film_actor}</p>
                    <p>上映时间：${ten_wantFilm_arr[k].film_time}</p>
                </div>
                <p style="font-size:16px;font-style:normal;font-weight:normal;">总想看：<span style="font-size:26px;font-weight:bold;">${ten_wantFilm_arr[k].film_want.slice(0, ten_wantFilm_arr[k].film_want.length - 1)}</span>万人</p>
            </div>
        </div>
        `
        }
        $(".list_img").html(str);
    })
}

// 国内票房榜
function ticket_film(film_area) {

    $.get('/list/film', { film_area }, function (data) {
        let film_arr = data;

        for (let k = 0; k < film_arr.length; k++) {
            if (film_arr[k].film_ticket.indexOf('万') >= 0) {
                film_arr[k].film_ticket = parseInt(film_arr[k].film_ticket) / 10000 + '亿'
            }
        }
        for (let i = 0; i < film_arr.length - 1; i++) {
            for (let j = i + 1; j < film_arr.length; j++) {
                if (parseInt(film_arr[j].film_ticket) > parseInt(film_arr[i].film_ticket)) {
                    let temp = film_arr[i];
                    film_arr[i] = film_arr[j];
                    film_arr[j] = temp
                }
            }
        }
        let ten_ticketFilm_arr = film_arr.slice(0, 10);

        let str = '';
        for (let k = 0; k < ten_ticketFilm_arr.length; k++) {
            let ranking = k + 1;
            if (k == 0) {
                ranking = '';
            }
            str += `
                <div class="list_img_1">
                    <i>${ranking}</i>
                    <a href="../details/details.html?${ten_ticketFilm_arr[k]._id}"><img src="${ip}${ten_ticketFilm_arr[k].film_mid_img}" alt="${ten_ticketFilm_arr[k].film_name}" /></a>
                    <div>
                        <div>
                            <h3>${ten_ticketFilm_arr[k].film_name}</h3>
                            <p>主演：${ten_ticketFilm_arr[k].film_actor}</p>
                            <p>上映时间：${ten_ticketFilm_arr[k].film_time}</p>
                        </div>
                        <p style="font-size:16px;font-style:normal;font-weight:normal;color:#ef4238">总票房：<span style="font-size:26px;font-weight:bold;">${ten_ticketFilm_arr[k].film_ticket.slice(0, ten_ticketFilm_arr[k].film_ticket.length - 1)}</span>${ten_ticketFilm_arr[k].film_ticket.slice(ten_ticketFilm_arr[k].film_ticket.length - 1, ten_ticketFilm_arr[k].film_ticket.length)}</p>
                    </div>
                </div>
                `
        }
        $(".list_img").html(str);
    })
}

// TOP100
function top100_Film() {
    $.get('/list/film', function (data) {
        let film_arr = data;
        for (let i = 0; i < film_arr.length - 1; i++) {
            for (let j = i + 1; j < film_arr.length; j++) {
                if (Number(film_arr[j].film_pro_point) > Number(film_arr[i].film_pro_point)) {
                    let temp = film_arr[i];
                    film_arr[i] = film_arr[j];
                    film_arr[j] = temp
                }
            }
        }
        let ten_top100_arr = film_arr.slice(0, 10);

        let str = '';
        for (let k = 0; k < ten_top100_arr.length; k++) {
            let ranking = k + 1;
            if (k == 0) {
                ranking = '';
            }
            str += `
            <div class="list_img_1">
                <i>${ranking}</i>
                <a href="../details/details.html?${ten_top100_arr[k]._id}"><img src="${ip}${ten_top100_arr[k].film_mid_img}" alt="${ten_top100_arr[k].film_name}" /></a>
                <div>
                    <div>
                        <h3>${ten_top100_arr[k].film_name}</h3>
                        <p>主演：${ten_top100_arr[k].film_actor}</p>
                        <p>上映时间：${ten_top100_arr[k].film_time}(${ten_top100_arr[k].film_area})</p>
                    </div>
                    <p>${ten_top100_arr[k].film_pro_point.slice(0, 2)}<span>${ten_top100_arr[k].film_pro_point.slice(2, 3)}</span></p>
                </div>
            </div>
            `
        }
        $(".list_img").html(str);
    });
}
