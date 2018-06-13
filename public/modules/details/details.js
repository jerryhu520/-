// 更改ip
let ip = 'http://127.0.0.1:3333';

// 发送url
$("#first_a>a").on('click', function () {
    $.get('/login/send_url', { url: location.href }, function () {

    })
})
let user_name;
let user_id;
let user_img;
let flag = true;

// 获取时间
let date = new Date();
let time = '0';
if (date.getMonth() <= 9) {
    time += date.getMonth() + 1 + '-';
} else {
    time = date.getMonth() + 1 + '-';
}

time += date.getDate();
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
            $("#write_comment").on('click', function () {
                location.href = '../login/login.html';
            })
        }
    })
})

let film_id = location.search.slice(1, location.search.length);

$.get('/details/get_film', { film_id }, function (data) {
    let film_data = data;
    render(film_data);
})

function render(film_data) {
    // 浏览器标题
    $("head>title").text(`${film_data.film_name} - 猫眼电影 - 一网打尽好电影`)

    // 电影大图等信息
    $(".img_intro").html(`
                <div>
                    <img src=${ip}${film_data.film_max_img} alt="">
                </div>
                <div class="intro">
                    <div>
                        <h3>${film_data.film_name}</h3>
                        <span>${film_data.film_English_name}</span>
                    </div>
                    <div>
                        <span>${film_data.film_type}</span>
                        <span>${film_data.film_area} / ${film_data.film_duration}</span>
                        <span>${film_data.film_time}大陆上映</span>
                    </div>
                    <div>
                        <a id="want_watch" href="#">想看</a>
                        <a href="#comment">评分</a>
                    </div>
                </div>
    `)

    // 右边评论
    $(".score_t").html(`
                <div>
                    <h3>用户评分</h3>
                    <span>${film_data.film_user_point}</span>
                    <span>${film_data.film_user_nums}人评分</span>
                </div>
                <div>
                    <h3>专业评分</h3>
                    <span>${film_data.film_pro_point}</span>
                    <span>${film_data.film_pro_nums}人评分</span>
                </div>
                <div>
                    <h3>累计票房</h3>
                    <p>${film_data.film_ticket.slice(0, film_data.film_ticket.length - 1)}<span> ${film_data.film_ticket.slice(film_data.film_ticket.length - 1, film_data.film_ticket.length)}</p></span>
                </div>
    `)

    // 剧情简介
    $("#film_intro").text(film_data.film_summary);

    // 演职人员
    $("#act_person").html(`
                <figure>
                    <a href=""><img src=${ip}${film_data.film_dir_img} alt="" /></a>
                    <figcaption><a href="">${film_data.film_director}</a></figcaption>
                </figure>
                `)
    let str = '';
    let actor_img_arr = film_data.film_act_img.split(',');
    let actor_arr = film_data.film_actor.split(',')
    for (let i = 0; i < 4; i++) {
        str += `
        <figure>
            <a href=""><img src=${ip}${actor_img_arr[i]} alt="" /></a>
            <figcaption><a href="">${actor_arr[i]}</a></figcaption>
        </figure>`
    }
    $("#act_person").append(str);

    // 图集

    let img_str = '';
    let imgs_arr = film_data.film_imgs.split(',');
    for (let i = 0; i < 5; i++) {
        img_str += `
        <a href=""><img src="${ip}${imgs_arr[i]}" alt="" /></a>
        `
    }
    $("#imgs").html(img_str);
}

// 相关资讯
$.get('/details/news', function (data) {
    let three_news_arr = data;
    three_news(three_news_arr);
})

function three_news(three_news_arr) {
    let str = '';
    for (let i = 0; i < three_news_arr.length; i++) {
        if (three_news_arr[i].news_title.length > 26) {
            three_news_arr[i].news_title = three_news_arr[i].news_title.slice(0, 25) + "…"
        }
        str += `
        <div class="about_news_con">
            <a href="../information/information.html?${three_news_arr[i]._id}"><img src="${ip}${three_news_arr[i].news_img.split(',')[three_news_arr[i].news_img.split(',').length - 1]}" alt=""></a>
            <div>
                <a href="../information/information.html?${three_news_arr[i]._id}">${three_news_arr[i].news_title}</a>
                <p>
                    <span>猫眼电影</span>
                    <span>21145</span>
                    <span>111</span>
                </p>
            </div>
        </div>
        `
    }
    $(".about_news").append(str);
}
// 相关电影
$.get('/details/film', function (data) {
    let six_film_arr = data;
    six_film(six_film_arr);
})

function six_film(six_film_arr) {
    for (let i = 0; i < six_film_arr.length; i++) {
        if (six_film_arr[i].film_name.length > 6) {
            six_film_arr[i].film_name = six_film_arr[i].film_name.slice(0, 6) + '…'
        }
        $(".about_movie_six").append(`
        <figure>
            <a href=./details.html?${six_film_arr[i]._id}>
                <img src=${ip}${six_film_arr[i].film_mid_img} alt="" />
            </a>
            <figcaption>
                <a href="">${six_film_arr[i].film_name}</a>
                <p>
                    <span>${six_film_arr[i].film_user_point.slice(0, 2)}</span><span>${six_film_arr[i].film_user_point.slice(2, 3)}</span>
                </p>
            </figcaption>
        </figure>
        `)
    }
}

// 写短评
$("#write_comment").on('click', function () {
    if (user_name) {
        if (flag) {
            $(".textarea_box").slideDown(400);
            $(".textarea_box").css('display', 'block');
            $("#write_comment").text('收起');
            flag = false;
        } else if (!flag) {
            // $(".textarea_box").css('display', 'none');
            $(".textarea_box").slideUp(400);
            $("#write_comment").text('写短评');
            flag = true;
        }
    } else {
        location.href = '../login/login.html';
    }
})

$(".textarea").focusin(function () {
    $(".textarea").css('border-color', '#df2d2d')
})
$(".textarea").focusout(function () {
    $(".textarea").css('border-color', '#d8d8d8');
});
$("#btn").on('click', function () {

    let comment = $("textarea").val();
    if ($("textarea").val()) {
        $.get('/details/save_comment', { user_id, user_name, time, film_id, comment, user_img }, function () {

            // 评论成功
            $("#success_comment").css('display', 'block');
            let comment_timer_1 = setInterval(function () {
                $("#success_comment").fadeTo('normal', 0, 'linear', function () {
                    clearInterval(comment_timer_1);
                });
            }, 1500);

            let comment_timer_2 = setInterval(function () {
                $("#success_comment").css('display', 'none');
            }, 3000);
            clearInterval(comment_timer_2);
            $(".textarea_box").slideUp(400);
            $("#write_comment").text('写短评');
            $("textarea").val('');
            flag = true;

            // 刷新页面
            renderFn();
        })
    } else {
        $(".textarea").css('border-color', '#df2d2d');
        $('textarea').attr('placeholder', '你还没编写评论哟！');
    }

})

// 取评论
renderFn();
function renderFn() {
    $.get('/details/get_comment', { film_id }, function (data) {
        let comment_arr = data;
        render_comment(comment_arr);
        if (comment_arr.length == 0) {
            $("#no_comment").css('display', 'block');
        } else {
            $("#no_comment").css('display', 'none');
        }
    })
    function render_comment(comment_arr) {
        let str = '';
        let user_img_url;
        for (let i = comment_arr.length - 1; i >= 0; i--) {
            user_img_url = `${ip}${comment_arr[i].user_img}`;
            if (!comment_arr[i].user_img) {
                user_img_url = '../../img/avatar.png';
            }

            str += `
                <div class="review_con">
                    <div class="review_head"><img src=${user_img_url} alt="" /></div>
                    <div>
                        <div class="review_con_r_l">
                            <div>
                                <p>${comment_arr[i].user_name}</p>
                                <p>${comment_arr[i].time}</p>
                            </div>
                            <input type="checkbox" name="" id="good">
                            <label for="good" >12058</label>
                        </div>
                        <p class="review_text">
                            ${comment_arr[i].comment}
                        </p>
                    </div>
                </div>
            `
        }
        $(".comment_container").html(str);
    }
}

