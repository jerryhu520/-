let mobile = document.getElementById("mobile");
let message = document.getElementById("message");
let pwd = document.getElementById("pwd");
let pwd_2 = document.getElementById("pwd_2");
let sub = document.getElementById("sub");
let mobileObj = {
    ele: mobile,
    regExp: /^1\d{10}$/,
    isOk: false
}
let messageObj = {
    ele: message,
    regExp: /^\d{6}$/,
    isOk: false
}
let pwdObj = {
    ele: pwd,
    regExp: /^.{6,}$/,
    isOk: false
}
let pwd_2Obj = {
    ele: pwd_2,
    fn: function () {
        return pwd_2.value == pwd.value && pwd.value != "";
    },
    isOk: false,
    error: " * 两次密码不一致"
}
mobile.onblur = function () {
    if ($("#mobile").val()) {
        let user_phone = $("#mobile").val();
        $.post('/users/isExist', { user_phone }, function (data) {
            if (data == 'isExist') {
                $("#mobile").next().html(' * 手机号已被注册').css('color', 'red');
            } else {
                judge(mobileObj);
            }
        })
    } else {
        $("#mobile").css('border', "1px solid #f76120");
        $("#mobile").next().html(' * 请输入手机号').css('color', 'red');
    }
}
$("#form>div>input").focus(function () {
    $(this).next().html('');
})
message.onblur = function () {
    judge(messageObj);
}
pwd.oninput = function () {
    let pwd = $("#pwd").val();
    if (pwd.length <= 6) {
        $("#pwd_color>span:first-child").css('background', 'red');
        $("#pwd_color>span:nth-child(2)").css('background', 'rgb(230,230,230)');
        $("#pwd_color>span:last-child").css('background', 'rgb(230,230,230)');
        console.log($("#pwd_color:first-child").text())
    } else if (pwd.length > 6 && pwd.length <= 12) {
        $("#pwd_color>span:first-child").css('background', 'orange');
        $("#pwd_color>span:nth-child(2)").css('background', 'orange');
        $("#pwd_color>span:last-child").css('background', 'rgb(230,230,230)');
    } else {
        $("#pwd_color>span").css('background', 'green');
    }
    if (!$("#pwd").val()) {
        $("#pwd_color>span").css('background', 'rgb(230,230,230)');
    }
}
pwd.onblur = function () {
    judge(pwdObj);
}
pwd_2.onblur = function () {
    judge(pwd_2Obj);
}
function judge(obj) {
    let flag = false;
    if (obj.fn) {
        flag = obj.fn();
    } else {
        flag = obj.regExp.test(obj.ele.value);
    }
    if (flag) {
        obj.ele.style.border = '1px solid rgb(170, 170, 170)';
        obj.ele.nextElementSibling.innerHTML = " ✔";
        obj.ele.nextElementSibling.style.color = "green";
        obj.ele.nextElementSibling.style.fontSize = "20px";
        obj.ele.nextElementSibling.style.fontWeight = "bold";
        obj.isOk = true;
    } else {
        obj.ele.style.border = '1px solid #f76120';
        obj.ele.nextElementSibling.innerHTML = obj.error || " * 格式不正确";
        obj.ele.nextElementSibling.style.color = "red";
        // obj.ele.nextElementSibling.style.fontSize = "12px";
        obj.ele.nextElementSibling.style.fontWeight = "normal";
        obj.isOk = false;
    }
}
$("#form").submit(function () {
    if (mobileObj.isOk && messageObj.isOk && pwdObj.isOk && pwd_2Obj.isOk) {
        return true;
    } else {
        if (!mobileObj.isOk) {
            $("#mobile+span>span").html(' * 请输入您的手机号码').css('color', 'red')
            $("#mobile").css('border', '1px solid #f76120');
        }
        if (!messageObj.isOk && !$("#message").next().html()) {
            $("#message").next().html(' * 请输入六位数验证码').css('color', 'red')
            $("#message").css('border', '1px solid #f76120');
        }
        if (!pwdObj.isOk && !$("#pwd").next().html()) {
            $("#pwd").next().html(' * 请填写密码').css('color', 'red')
            $("#pwd").css('border', '1px solid #f76120');
        }
        if (!pwd_2Obj.isOk && !$("#pwd_2").next().html()) {
            $("#pwd_2").next().html(' * 请再次输入密码').css({ 'color': 'red' })
            $("#pwd_2").css('border', '1px solid #f76120');
        }
        return false;
    }
})