// 每次调用ajax的get post ajax会调用合格函数

$.ajaxPrefilter(function(options) {
    // console.log(options.url); //是请求的url

    options.url = 'http://www.liulongbin.top:3007' + options.url
        //不等于 -1说明存在my字符
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    var complete = function(res) {
        if (res.responseJSON
            .status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = "./login.html"
        }
    }

})