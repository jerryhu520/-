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
        user_name = data.user_phone;
        user_id = data.user_id;
        user_img = data.user_img;
        if (user_name.length > 5) {
            $(".welcome").text(`${user_name.slice(0, 5)}…`);
        } else {
            $(".welcome").text(`${user_name}`);
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


// 同步AJAX
// $.ajaxSetup({ async: false });

$('.first_page').css({
    'background': 'rgb(239, 66, 59)',
    'color': 'white'
});


// 每一页显示多少条信息
const everyPage = 30;

// 当前页数
let nowPage = 1;

// 最大页数
let maxPage;

// 电影灰色条三个板块
let film_class;

// 灰色条
$(".gray_block_con>li:first-child>.to_top").css('display', 'inline-block');
$(".gray_block_con>li:first-child").css('color', 'rgb(239, 66, 59)');

$(".gray_block_con").delegate('li', 'click', function (maxPage) {
    $(".gray_block_con>li>.to_top").css('display', 'none');
    $(".gray_block_con>li").css('color', 'rgb(153, 153, 153)');

    // 三角形
    $(this).children('.to_top').css('display', 'inline-block');
    $(this).css('color', 'rgb(239, 66, 59)');

    // page
    $('.click_page').css({
        'background': 'rgb(248, 249, 248)',
        'color': 'black'
    });
    film_class = $(this).index();
    switch (film_class) {
        case 0:
            $("head>title").text(`${$(this).text()} - 猫眼电影 - 一网打尽好电影`)
            $(".hidden").css('display', 'inline-block');
            $(".red_point").css('display', 'none');
            $('.first_page').css({
                'background': 'rgb(239, 66, 59)',
                'color': 'white'
            });
            beingFilm(type, country, year, '0', 1, everyPage);
            select_film(film_class);
            break;
        case 1:
            $("head>title").text(`${$(this).text()} - 猫眼电影 - 一网打尽好电影`)
            $(".red_point").css('display', 'none');
            $(".hidden").css('display', 'none');
            $('.first_page').css({
                'background': 'rgb(239, 66, 59)',
                'color': 'white'
            });
            comingFilm(type, country, year, '0', 1, everyPage);
            select_film(film_class);
            break;
        case 2:
            $("head>title").text(`${$(this).text()} - 猫眼电影 - 一网打尽好电影`)
            $(".hidden").css('display', 'inline-block');
            $(".red_point").css('display', 'none');
            $('.first_page').css({
                'background': 'rgb(239, 66, 59)',
                'color': 'white'
            });
            hotFilm(type, country, year, '0', 1, everyPage);
            select_film(film_class);
            break;

    }
})

let type = '';
let country = '';
let year = '';
let term = '0';




// 默认热映电影
beingFilm(type, country, year, term, nowPage, everyPage);


// 全部亮着
$(".movie_list>ul>li:first-child").css({
    'background': 'rgb(239, 66, 59)',
    'color': 'white'
});



// 正在热映所有电影
function beingFilm(type, country, year, term, nowPage, everyPage) {
    $.get('/movie/get_beingFilm', { type, country, year, term, nowPage, everyPage }, function (data) {
        maxPage = data.maxPage;
        let beingFilm_arr = data.nowFilmArr;
        render(beingFilm_arr);
        // 创建页数
        creat_page(maxPage);
    })
}

// 即将上映所有电影
function comingFilm(type, country, year, term, nowPage, everyPage) {
    $.get('/movie/get_comingFilm', { type, country, year, term, nowPage, everyPage }, function (data) {
        maxPage = data.maxPage;
        let comingFilm_arr = data.nowFilmArr;
        render(comingFilm_arr);
        // 创建页数
        creat_page(maxPage);
    })
}

// 热播所有电影
function hotFilm(type, country, year, term, nowPage, everyPage) {
    $.get('/movie/get_hotFilm', { type, country, year, term, nowPage, everyPage }, function (data) {
        maxPage = data.maxPage;
        let hotFilm_arr = data.nowFilmArr;
        render(hotFilm_arr);
        // 创建页数
        creat_page(maxPage);
    })
}

// 创建页数
function creat_page(maxPage) {
    $(".creat_page").css('display', 'none');
    $(".page_point").css('display', 'none');
    for (let i = 1; i < maxPage; i++) {
        if (i >= 1) {
            $(".creat_page").eq(i).text(i + 1);
            $(".creat_page").eq(i).css('display', 'block');
        }
        if (maxPage > 5) {
            $(".page_point").css('display', 'block')
            $(".creat_page").eq(4).text(maxPage);
        }
    }
    if (maxPage == 1) {
        $('.to_down').css('visibility', 'hidden');
    } else {
        $('.to_down').css('visibility', 'visible');
    }
}

// 创建页数
creat_page(maxPage);


select_film('0');
function select_film(film_class) {
    // 翻页
    $(".pages").delegate('.click_page', 'click', function () {
        $('.pages>li').css({
            'background': 'rgb(248, 249, 248)',
            'color': 'black'
        });
        $(this).css({
            'background': 'rgb(239, 66, 59)',
            'color': 'white'
        });
        nowPage = Number($(this).text());
        if (nowPage > 1) {
            $(".to_up").css('visibility', 'visible')
        } else {
            $(".to_up").css('visibility', 'hidden')
        }

        if (nowPage == 1) {
            $(".to_down").css('visibility', 'hidden')
        } else {
            $(".to_down").css('visibility', 'visible')
        }
        if (film_class == 0) {
            beingFilm(type, country, year, term, nowPage, everyPage);
        } else if (film_class == 1) {
            comingFilm(type, country, year, term, nowPage, everyPage);
        } else if (film_class == 2) {
            hotFilm(type, country, year, term, nowPage, everyPage);
        }
    })

    // 上一页
    $(".to_up").on('click', function () {
        nowPage--;
        $('.pages>li').css({
            'background': 'rgb(248, 249, 248)',
            'color': 'black'
        });
        if (nowPage == 1) {
            nowPage = 0
        }
        $('.click_page').eq(nowPage).css({
            'background': 'rgb(239, 66, 59)',
            'color': 'white'
        });

        if (nowPage <= 1) {
            nowPage = 1
        }
        if (nowPage == 1) {
            $(".to_up").css('visibility', 'hidden')
        }
        if (film_class == 0) {
            beingFilm(type, country, year, term, nowPage, everyPage);
        } else if (film_class == 1) {
            comingFilm(type, country, year, term, nowPage, everyPage);
        } else if (film_class == 2) {
            hotFilm(type, country, year, term, nowPage, everyPage);
        }
    })

    // 下一页
    $(".to_down").on('click', function () {
        nowPage++;

        $('.pages>li').css({
            'background': 'rgb(248, 249, 248)',
            'color': 'black'
        });
        $('.click_page').eq(nowPage).css({
            'background': 'rgb(239, 66, 59)',
            'color': 'white'
        });

        if (nowPage > 1) {
            $(".to_up").css('visibility', 'visible')
        } else {
            $(".to_up").css('visibility', 'hidden')
        }
        if (nowPage >= maxPage) {
            nowPage = maxPage
        }
        if (film_class == 0) {
            beingFilm(type, country, year, term, nowPage, everyPage);
        } else if (film_class == 1) {
            comingFilm(type, country, year, term, nowPage, everyPage);
        } else if (film_class == 2) {
            hotFilm(type, country, year, term, nowPage, everyPage);
        }
    })

    // 按类型查找
    $("#find_type").delegate('li', 'click', function () {
        $("#find_type>li").css({
            'background': 'rgb(248, 249, 248)',
            'color': 'rgb(51, 51, 51)',
            'cursor': 'pointer'
        });
        $(this).css({
            'background': 'rgb(239, 66, 59)',
            'color': 'white',
            'cursor': 'default'
        });
        type = $(this).text();
        if (type == '全部') {
            type = '';
        }
        if (film_class == 0) {
            beingFilm(type, country, year, term, 1, everyPage);
        } else if (film_class == 1) {
            comingFilm(type, country, year, term, 1, everyPage);
        } else if (film_class == 2) {
            hotFilm(type, country, year, term, 1, everyPage);
        }


    })

    // 按国家查找
    $("#find_country").delegate('li', 'click', function () {
        $("#find_country>li").css({
            'background': 'rgb(248, 249, 248)',
            'color': 'rgb(51, 51, 51)',
            'cursor': 'pointer'
        });
        $(this).css({
            'background': 'rgb(239, 66, 59)',
            'color': 'white',
            'cursor': 'default'
        })
        country = $(this).text();
        if (country == '全部') {
            country = '';
        }
        if (film_class == 0) {
            beingFilm(type, country, year, term, 1, everyPage);
        } else if (film_class == 1) {
            comingFilm(type, country, year, term, 1, everyPage);
        } else if (film_class == 2) {
            hotFilm(type, country, year, term, 1, everyPage);
        }
    })

    // 按年代查找
    $("#find_year").delegate('li', 'click', function () {
        $("#find_year>li").css({
            'background': 'rgb(248, 249, 248)',
            'color': 'rgb(51, 51, 51)',
            'cursor': 'pointer'
        });
        $(this).css({
            'background': 'rgb(239, 66, 59)',
            'color': 'white',
            'cursor': 'default'
        });
        year = $(this).text();
        if (year == '全部') {
            year = '';
        }
        if (film_class == 0) {
            beingFilm(type, country, year, term, 1, everyPage);
        } else if (film_class == 1) {
            comingFilm(type, country, year, term, 1, everyPage);
        } else if (film_class == 2) {
            hotFilm(type, country, year, term, 1, everyPage);
        }
    })

    // 热门、时间、评分排序
    // 点击字
    $(".first_red_point").css('display', 'inline-block');
    $("#other_term").delegate('span', 'click', function () {
        $(".red_point").css('display', 'none');
        term = $(this).attr('data-index');
        $(this).prev().css('display', 'inline-block');
        if (film_class == 0) {
            beingFilm(type, country, year, term, 1, everyPage);
        } else if (film_class == 1) {
            comingFilm(type, country, year, term, nowPage, everyPage);
        } else if (film_class == 2) {
            hotFilm(type, country, year, term, nowPage, everyPage);
        }
    })
    // 点击红点
    $("#other_term").delegate('.white_point', 'click', function () {
        $(".red_point").css('display', 'none')
        term = $(this).next().next().attr('data-index');
        $(this).next().css('display', 'inline-block');
        if (film_class == 0) {
            beingFilm(type, country, year, term, 1, everyPage);
        } else if (film_class == 1) {
            comingFilm(type, country, year, term, nowPage, everyPage);
        } else if (film_class == 2) {
            hotFilm(type, country, year, term, nowPage, everyPage);
        }
    })
}


// 渲染页面
function render(beingFilm_arr) {
    let str = '';

    for (let i = 0; i < beingFilm_arr.length; i++) {
        let movie_rule = `<span>${beingFilm_arr[i].film[0].film_user_point.slice(0, 2)}</span><span>${beingFilm_arr[i].film[0].film_user_point.slice(2, 3)}</span>`;
        if (film_class == 1) {
            movie_rule = `<span style='font-style:normal;font-size:16px'>${beingFilm_arr[i].film[0].film_want}人想看</span>`
        }
        if (beingFilm_arr[i].film[0].film_name.length > 8) {
            beingFilm_arr[i].film[0].film_name = beingFilm_arr[i].film[0].film_name.slice(0, 8) + "…"
        }
        str += `
        <figure class="blue_box">
            <a href="../details/details.html?${beingFilm_arr[i].film[0]._id}"><img src="${ip}${beingFilm_arr[i].film[0].film_mid_img}" alt="" /><i class="blue_label_2 blue_label"></i></a>
            <figcaption>
                <a href="../details/details.html?${beingFilm_arr[i].film[0]._id}">${beingFilm_arr[i].film[0].film_name}</a>
                <p>${movie_rule}</p>
            </figcaption>
        </figure>
        `
    }
    if (beingFilm_arr == 0) {
        $(".movie_img_1").html('<p style="margin-top:40px">抱歉，没有找到相关结果，请尝试用其他条件筛选。</p>')
        $(".pages").css('display', 'none');
    } else {
        $(".movie_img_1").html(str);
        $(".pages").css('display', '');
    }

}

$('#sub').click(function () {

    let val = $('#text').val();
    let newVal = val.split(',');
    let newVal2 = [];
    for (let i = newVal.length - 1; i >= 0; i--) {
        newVal2.push(newVal[i])
    }
    $('#text').val(newVal2.join(','));
})