let url;
$("#form").submit(function () {
    let user_phone = $("#user_phone").val();
    let user_pwd = $("#user_pwd").val();
    if (user_phone && user_pwd) {
        return true;
    } else {
        return false;
    }
})

window.onload = function () {
    if (location.search.indexOf('isLogin') >= 0) {
        $("#error_info").css('display', 'block');
    }
}
