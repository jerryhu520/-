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
            $("#a_box").css('width', '135px');
            $("#head_img").attr('src', `${ip}/img/user_img/avatar.png`);
            $("#write_comment").on('click', function () {
                location.href = '../login/login.html';
            })
        }
    })
})


// 获取资讯id
let news_id = location.search.slice(1, location.search.length);
$.get('/information/get_news', { news_id }, function (data) {
    // 浏览器标题
    $('head>title').html(`${data.news_title} - 猫眼电影 - 一网打尽好电影`);

    let news_arr = data;
    render_news(news_arr);
})

function render_news(news_arr) {
    $("#news_head").html(`
        <h2>${news_arr.news_title}</h2>
        <div>
            <span>猫眼电影</span>
            <span>${news_arr.news_time}</span>
            <span>22448人浏览</span>
        </div>
    `)
    let content_arr = news_arr.news_content.split('*');
    let news_img_arr = news_arr.news_img.split(',');
    let str = '';
    if (content_arr.length > news_img_arr.length) {
        item = content_arr
    } else {
        item = news_img_arr;
    }
    for (let i = 0; i < item.length; i++) {
        let img_src = `<img src=${ip}${news_img_arr[news_img_arr.length - 1 - i]}>`;
        if (!content_arr[i]) {
            content_arr[i] = '';
        }
        if (!news_img_arr[news_img_arr.length - 1 - i]) {
            img_src = '';
        }
        str += `<p>${content_arr[i]}</p>` + img_src;

    }

    $("#news_content").html(str);
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
        $.get('/information/save_comment', { user_id, user_name, time, news_id, comment, user_img }, function () {

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
    $.get('/information/get_comment', { news_id }, function (data) {
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
            let user_img_url = `${ip}${comment_arr[i].user_img}`;
            if (!comment_arr[i].user_img) {
                user_img_url = '../../img/avatar.png'
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

// 相关电影
$.get('/information/film', function (data) {
    let one_film_arr = data;
    one_film(one_film_arr);
})

function one_film(one_film_arr) {
    for (let i = 0; i < one_film_arr.length; i++) {
        if (one_film_arr[i].film_name.length > 5) {
            one_film_arr[i].film_name = one_film_arr[i].film_name.slice(0, 5) + '…'
        }
        $(".about_movie_six").html(`
            <a href=../details/details.html?${one_film_arr[i]._id}>
                <img src=${ip}${one_film_arr[i].film_mid_img} alt="" />
            </a>
            <figcaption>
                <a href="">${one_film_arr[i].film_name}</a>
                <p>
                    <span>${one_film_arr[i].film_user_point.slice(0, 2)}</span><span>${one_film_arr[i].film_user_point.slice(2, 3)}</span>
                </p>
            </figcaption>
        `)
    }
}